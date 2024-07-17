

var express = require('express');
var router = express.Router();
const path = require('path'); // path 모듈 불러오기
const multer = require('multer');
const fs = require('fs');
const { parse } = require('csv-parse'); // CSV 파싱 라이브러리

router.get('/create/ddl', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..',  'Scripts', 'deep_formula_create_ddl.sql');
        console.log('filePath',filePath)
        const sql = await getSqlFileContent(filePath);

        // SQL 실행
        const client = await pool.connect();
        try {
            await client.query(sql);
            res.status(200).json({ message: 'DDL 실행 성공' });
        } catch (err) {
            console.error('DDL 실행 중 오류 발생:', err);
            res.status(500).json({ message: 'DDL 실행 중 오류 발생' });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('SQL 파일 읽기 중 오류 발생:', err);
        res.status(500).json({ message: 'SQL 파일 읽기 중 오류 발생' });
    }
});

// SQL 파일 내용 가져오는 함수
async function getSqlFileContent(filePath) {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}



// --------------------------Csv Upload -------------------------------

// 파일 저장 설정
try {
    fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
    console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}
const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, done) { // 저장 위치
            done(null, 'uploads/'); // uploads라는 폴더 안에 저장
        },
        filename(req, file, done) { // 파일명을 어떤 이름으로 올릴지
            const ext = path.extname(file.originalname); // 파일의 확장자
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
});

router.post('/upload/csv/:tableName', upload.any(), async (req, res) => {
    const tableName = req.params.tableName;
    console.log(`파일 업로드 시작: ${tableName}`);

    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: '파일이 없습니다.' });
        }

        for (const file of req.files) {
            console.log(`파일 처리: ${file.originalname}`);
            const csvData = fs.readFileSync(file.path, 'utf8');
            const rows = csvData.split('\n');
            const header = rows.shift().split(',');

            // 헤더 정보를 사용하여 컬럼 목록 생성
            const columns = header.map((column) => `"${column.trim()}"`);

            // 데이터베이스 삽입 또는 업데이트
            for (let i = 1; i < rows.length; i++) { // 헤더를 제외한 데이터부터 처리
                const row = rows[i].split(',');

                try { // 각 행 처리에서 발생할 수 있는 에러를 잡기 위한 try-catch
                    // 컬럼 개수만큼 값을 가져와 배열에 담음 (빈 값은 NULL로 채움)
                    const values = row.map((value, index) => {
                        // 컴마와 싱글쿼테이션을 빈 문자열로 치환
                        value = value.replace(/[,']/g, '').trim();
                        // 빈 값 체크 후 NULL로 채움
                        return value === '' ? 'NULL' : `'${value}'`;
                    });

                    if (values.length > 0 && values.length === columns.length) {
                        // 중복 체크를 위한 조건 생성
                        const checkConditions = columns.map((col, index) => `${col} = ${values[index]}`).join(' AND ');
                        const checkQuery = `SELECT COUNT(*) FROM pps.tb_${tableName} WHERE ${checkConditions}`;
                        const checkResult = await pool.query(checkQuery);

                        let query;
                        if (checkResult.rows[0].count > 0) {
                            // update
                            const updateSet = columns.map((col, index) => `${col} = ${values[index]}`).join(', ');
                            query = `
                UPDATE pps.tb_${tableName}
                SET ${updateSet}, update_dt = NOW()
                WHERE ${checkConditions}
              `;
                        } else {
                            // insert
                            query = `
                INSERT INTO pps.tb_${tableName} (${columns.join(', ')}, create_dt, update_dt)
                VALUES (${values.join(',')}, NOW(), NOW())
              `;
                        }
                        console.log('query:', query);
                        // 쿼리 실행
                        await pool.query(query);
                    } else {
                        console.error(`데이터 형식 오류: ${row}`); // 형식이 맞지 않는 행에 대한 로그 출력
                    }
                } catch (error) {
                    console.error(`데이터 처리 오류 (행 ${i + 1}): ${error.message}`); // 에러 로그 출력
                    // 에러 발생 시에도 다음 행 처리를 위해 continue;
                }
            }
            console.log(`파일 업로드 완료: ${file.originalname}`);
        }
        res.status(200).json({ message: `${tableName} 테이블에 데이터 적재 성공` });
    } catch (error) {
        console.error('데이터 적재 오류:', error);
        res.status(500).json({ message: '데이터 적재 실패: ' + error.message });
    }
});

router.get('/download/sample/:table_name', (req, res) => {
    const tableName = req.params.table_name;
    const filePath = path.join(__dirname, '..', 'src', 'DeepFormula', 'data', 'download_sample_csv', `${tableName}.csv`);
    console.log('download filePath', filePath);

    try {
        const stats = fs.statSync(filePath);

        res.setHeader('Content-Type', 'application/octet-stream'); // Blob 타입 명시
        res.setHeader('Content-Disposition', `attachment; filename=${tableName}.csv`);
        res.setHeader('Content-Length', stats.size);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('파일 다운로드 에러 (서버):', error);
        res.status(500).send('파일 다운로드 중 오류가 발생했습니다.');
    }
});


// --------------------------1. sticky_ingredient-------------------------------
// 컬럼 이름 배열
const stickyIngredientColumns = [
    'code', 'name', 'ad_force', 'water', "10027", "10028", "10066", "10102", "10105", "10114",
    "10145", "10150", "10158", "10195", "10249", "10315", "10317", "10318", "10319",
    "10349", "10351", "10422", "10424", "10449", "10455", "10457", "10465", "10520",
    "10613", "10615", "10651", "10696", "10700", "10782", "10963", "10965", "11001",
    "11054", "11089", "11323", "11358", "11732", "11858", "13100", "13188", 'others'
];


// --- GET: name으로 데이터 조회 ---
router.get('/sticky_ingredient/search/:name', (req, res) => {
    // const codeName = req.params.name;
    const codeName = decodeURIComponent(req.params.name);
    console.log('codeName', codeName)
    const selectColumns = stickyIngredientColumns.map(column => `"${column}"`).join(', ');
    // SQL Injection 방어를 위해 Prepared Statement 사용
    const query = `
      SELECT 
        code || '|' || name AS code_name, ${selectColumns}
      FROM 
        pps.tb_sticky_ingredient 
      WHERE 
        code || '|' || name LIKE $1
  `;
    console.log(query)

    const likeCodeName = `%${codeName}%`;
    console.log(query,likeCodeName)

    pool.query(query, [likeCodeName], (error, results) => {
        if (error) {
            console.error("GET 요청 에러:", error);
            res.status(500).json({ error: '데이터 조회 실패' });
            return;
        }
        if (results.rows.length === 0) {
            return res.status(200).json([]);
        }
        res.json(results.rows);
    });
});

// --- GET: 특정 ID 데이터 조회 (idx 기준) ---
router.get('/sticky_ingredient/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);
    const query = `SELECT ${stickyIngredientColumns.join(', ')} FROM pps.tb_sticky_ingredient WHERE idx = $1`;

    pool.query(query, [idx], (error, results) => {
        if (error) {
            console.error("GET (ID) 요청 에러:", error);
            res.status(500).json({ error: '데이터 조회 실패' });
        } else if (results.rows.length === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json(results.rows[0]);
        }
    });
});

router.post('/sticky_ingredient/cosine', async (req, res) => {
    try {
        const allColumnNames = [
            "water", "10027", "10028", "10066", "10102", "10105", "10114",
            "10145", "10150", "10158", "10195", "10249", "10315", "10317",
            "10318", "10319", "10349", "10351", "10422", "10424", "10449",
            "10455", "10457", "10465", "10520", "10613", "10615", "10651",
            "10696", "10700", "10782", "10963", "10965", "11001", "11054",
            "11089", "11323", "11358", "11732", "11858", "13100", "13188", "others"
        ];

        // 입력값 처리
        const requestDataObj = req.body.reduce((acc, item) => {
            const key = Object.keys(item)[0];
            if (key !== 'ad_force') {
                acc[key] = parseFloat(item[key]) || 0;
            }
            return acc;
        }, {});

        // 입력 벡터 생성
        const inputVector = allColumnNames.map(col => requestDataObj[col] || 0);
        const inputVectorMagnitude = Math.sqrt(inputVector.reduce((sum, val) => sum + val * val, 0));

        // Vector magnitude SQL 생성
        const columnVectorMagnitudeSQL = `SQRT(${allColumnNames.map(col => `POWER(NULLIF(CAST("${col}" AS FLOAT), 0), 2)`).join(' + ')})`;

        // Dot product SQL 생성
        const dotProductSQL = allColumnNames.map((col, index) => `($${index + 1}::FLOAT * NULLIF(CAST("${col}" AS FLOAT), 0))`).join(' + ');

        const query = `
            WITH input_vector AS (
                SELECT ARRAY[$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43]::float[] AS vec,
                $44::float AS magnitude
            ),
            normalized_data AS (
                SELECT 
                    "ad_force",
                    code,
                    name,
                    ${allColumnNames.map(col => `COALESCE(NULLIF(NULLIF("${col}"::text, ''), '0')::float, 0) AS "${col}"`).join(', ')},
                    ARRAY[
                       ${allColumnNames.map(col => `COALESCE(NULLIF(NULLIF("${col}"::text, ''), '0')::float, 0)`).join(', ')}
                    ]::float[] AS vec,
                    SQRT(${allColumnNames.map(col => `POWER(COALESCE(NULLIF(NULLIF("${col}"::text, ''), '0')::float, 0), 2)`).join(' + ')}) AS magnitude
                FROM pps.tb_sticky_ingredient
            ),
            similarity_calc AS (
                SELECT 
                    nd.*,
                    CASE 
                        WHEN nd.magnitude = 0 OR iv.magnitude = 0 THEN 0
                        ELSE (
                            ${allColumnNames.map((col, index) => `(nd.vec[${index + 1}] * iv.vec[${index + 1}])`).join(' + ')}
                        ) / (nd.magnitude * iv.magnitude)
                    END AS similarity
                FROM normalized_data nd
                CROSS JOIN input_vector iv
            )
            SELECT *
            FROM similarity_calc
            ORDER BY similarity DESC NULLS LAST
            LIMIT 1;
        `;

        // 쿼리 파라미터 설정
        const queryParams = [...inputVector, inputVectorMagnitude];

        console.log('Query:', query);
        console.log('Query Params:', queryParams);

        // 쿼리 실행
        const result = await pool.query(query, queryParams);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: '유사한 데이터를 찾을 수 없습니다.' });
        }

        const mostSimilar = result.rows[0];
        const similarityScore = mostSimilar.similarity !== null ? parseFloat(mostSimilar.similarity) : 0;
        const normalizedSimilarity = Math.round(similarityScore * 10000) / 100;

        res.json({
            data: [{
                code: mostSimilar.code,
                name: mostSimilar.name,
                ad_force: parseFloat(mostSimilar.ad_force) || 0,
                similarity: normalizedSimilarity,
                values: allColumnNames.reduce((acc, col) => {
                    const value = mostSimilar[col.toLowerCase()];  // PostgreSQL은 열 이름을 소문자로 반환할 수 있습니다
                    acc[col] = value !== null && value !== '' ? parseFloat(value) : 0;
                    return acc;
                }, {})
            }]
        });

    } catch (error) {
        console.error("POST /sticky_ingredient/cosine 요청 에러:", error);
        res.status(500).json({ error: '데이터 처리 실패', details: error.message });
    }
});


router.post('/sticky_ingredient', (req, res) => {
    // 1. 모든 요청 데이터 가져오기
    const requestData = req.body;

    // 2. 유효성 검사: code, name 필수 여부 확인
    if (!requestData.code || !requestData.name) {
        return res.status(400).json({ error: '필수 필드(code, name)가 누락되었습니다.' });
    }

    // 3. DB 쿼리 생성
    const columns = [];
    const values = [];
    const placeholders = [];

    // stickyIngredientColumns 순서대로 데이터 처리
    stickyIngredientColumns.forEach((column, index) => {
        // 컬럼 이름 추가
        columns.push(`"${column}"`);

        // 요청 데이터에 해당 컬럼 값이 있는 경우
        if (requestData[column] !== undefined) {
            values.push(requestData[column]);
            placeholders.push(`$${index + 1}`);
        } else {
            // 컬럼 값이 없는 경우 NULL 삽입
            values.push(null);
            placeholders.push('NULL');
        }
    });

    const query = `
    INSERT INTO pps.tb_sticky_ingredient (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
  `;

    // 4. 쿼리 실행
    pool.query(query, values, (error) => {
        if (error) {
            console.error("POST 요청 에러:", error);
            res.status(500).json({ error: '데이터 추가 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 추가되었습니다.' });
        }
    });
});

// --- PUT: 특정 ID 데이터 수정 (idx 기준) ---
router.put('/sticky_ingredient/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    // stickyIngredientColumns 배열을 순회하며 업데이트 쿼리 생성
    const setStatements = stickyIngredientColumns.map((column, index) => {
        // 요청 본문에 해당 컬럼의 값이 존재하면 업데이트 쿼리에 포함
        if (req.body[column] !== undefined) {
            return `"${column}" = $${index + 1}`;
        } else {
            return null;
        }
    }).filter(statement => statement !== null) // null 값 제거
        .join(', ');

    // 업데이트할 값 배열 생성
    const values = stickyIngredientColumns.map(column => {
        return req.body[column] !== undefined ? req.body[column] : null;
    }).filter(value => value !== null); // null 값 제거

    // idx 추가
    values.push(idx);

    // 쿼리 조합
    const query = `
    UPDATE pps.tb_sticky_ingredient
    SET ${setStatements}
    WHERE idx = $${values.length}
  `;

    pool.query(query, values, (error) => {
        if (error) {
            console.error("PUT 요청 에러:", error);
            res.status(500).json({ error: '데이터 수정 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 수정되었습니다.' });
        }
    });
});
// --- DELETE: 특정 ID 데이터 삭제 (idx 기준) ---
router.delete('/sticky_ingredient/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    pool.query('DELETE FROM pps.tb_sticky_ingredient WHERE idx = $1', [idx], (error) => {
        if (error) {
            console.error("DELETE 요청 에러:", error);
            res.status(500).json({ error: '데이터 삭제 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
        }
    });
});
// --------------------------2. physical_properties-------------------------------
// 물성 데이터 컬럼 정의 (변수 사용)
const physicalPropertiesColumns = [
    'code',
    'name',
    'category',
    'ad_force',
    'spreadability',
    'ga',
    'ga2',
    'yield_stress',
    'gf',
    'gf2',
    'g10',
    'stress',
];

// GET: 모든 데이터 조회
router.get('/physical_properties', (req, res) => {
    pool.query('SELECT * FROM pps.tb_physical_properties', (error, results) => {
        if (error) {
            console.error('GET 요청 에러:', error);
            res.status(500).json({ error: '데이터 조회 실패' });
        } else {
            res.json(results.rows);
        }
    });
});

// GET: 특정 ID 데이터 조회 (idx 기준)
router.get('/physical_properties/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);
    pool.query(
        'SELECT * FROM pps.tb_physical_properties WHERE idx = $1',
        [idx],
        (error, results) => {
            if (error) {
                console.error('GET (ID) 요청 에러:', error);
                res.status(500).json({ error: '데이터 조회 실패' });
            } else if (results.rows.length === 0) {
                res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
            } else {
                res.json(results.rows[0]);
            }
        }
    );
});

// POST: 새로운 데이터 추가
router.post('/physical_properties', (req, res) => {
    const {
        code,
        name,
        category,
        ad_force,
        spreadability,
        ga,
        ga2,
        yield_stress,
        gf,
        gf2,
        g10,
        stress,
    } = req.body;

    // 데이터 유효성 검사 (필수 필드만 검사하는 예시)
    if (!code || !name || !category) {
        return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
    }

    // 컬럼 이름을 동적으로 생성하여 SQL 쿼리 작성
    const columns = physicalPropertiesColumns.join(', ');
    const values = physicalPropertiesColumns.map((_, index) => `$${index + 1}`).join(', ');
    const placeholders = physicalPropertiesColumns.map((_, index) => `$${index + 1}`).join(', ');

    pool.query(
        `INSERT INTO pps.tb_physical_properties (${columns}) VALUES (${values})`,
        [
            code,
            name,
            category,
            ad_force,
            spreadability,
            ga,
            ga2,
            yield_stress,
            gf,
            gf2,
            g10,
            stress,
        ],
        (error) => {
            if (error) {
                console.error('POST 요청 에러:', error);
                res.status(500).json({ error: '데이터 추가 실패', detail: error.message });
            } else {
                res.json({ message: '데이터가 성공적으로 추가되었습니다.' });
            }
        }
    );
});

// PUT: 특정 ID 데이터 수정 (idx 기준)
router.put('/physical_properties/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);
    const {
        code,
        name,
        category,
        ad_force,
        spreadability,
        ga,
        ga2,
        yield_stress,
        gf,
        gf2,
        g10,
        stress,
    } = req.body;

    // 컬럼 이름을 동적으로 생성하여 SQL 쿼리 작성
    const updateSet = physicalPropertiesColumns.map(
        (column, index) => `${column} = $${index + 1}`
    ).join(', ');

    pool.query(
        `UPDATE tb_physical_properties SET ${updateSet} WHERE idx = $${physicalPropertiesColumns.length + 1}`,
        [
            code,
            name,
            category,
            ad_force,
            spreadability,
            ga,
            ga2,
            yield_stress,
            gf,
            gf2,
            g10,
            stress,
            idx,
        ],
        (error) => {
            if (error) {
                console.error('PUT 요청 에러:', error);
                res.status(500).json({ error: '데이터 수정 실패' });
            } else {
                res.json({ message: '데이터가 성공적으로 수정되었습니다.' });
            }
        }
    );
});

// DELETE: 특정 ID 데이터 삭제 (idx 기준)
router.delete('/physical_properties/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    pool.query('DELETE FROM pps.tb_physical_properties WHERE idx = $1', [idx], (error) => {
        if (error) {
            console.error("DELETE 요청 에러:", error);
            res.status(500).json({ error: '데이터 삭제 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
        }
    });
});

// --------------------------3. material_ingredient-------------------------------
// 데이터베이스 테이블 컬럼 정의
const materialIngredientColumns = ['code', 'code', 'content'];

// GET: 모든 데이터 조회
router.get('/material_ingredient', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM pps.tb_material_ingredient');
        res.json(results.rows);
    } catch (error) {
        console.error("GET 요청 에러:", error);
        res.status(500).json({ error: '데이터 조회 실패' });
    }
});

// GET: 특정 ID 데이터 조회 (idx 기준)
router.get('/material_ingredient/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);

    try {
        const results = await pool.query('SELECT * FROM pps.tb_material_ingredient WHERE idx = $1', [idx]);

        if (results.rows.length === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json(results.rows[0]);
        }
    } catch (error) {
        console.error("GET (ID) 요청 에러:", error);
        res.status(500).json({ error: '데이터 조회 실패' });
    }
});

// POST: 새로운 데이터 추가
router.post('/material_ingredient', async (req, res) => {
    const { ingredient_code, material_code, content } = req.body;

    // 데이터 유효성 검사
    if (!materialIngredientColumns.every(column => req.body[column])) {
        return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
    }

    try {
        await pool.query(
            'INSERT INTO pps.tb_material_ingredient (ingredient_code, material_code, content, create_dt, update_dt) VALUES ($1, $2, $3, NOW(), NOW())',
            [ingredient_code, material_code, content]
        );
        res.json({ message: '데이터가 성공적으로 추가되었습니다.' });
    } catch (error) {
        console.error("POST 요청 에러:", error);
        res.status(500).json({ error: '데이터 추가 실패' });
    }
});

// PUT: 특정 ID 데이터 수정 (idx 기준)
router.put('/material_ingredient/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);
    const { ingredient_code, material_code, content } = req.body;

    try {
        await pool.query(
            'UPDATE pps.tb_material_ingredient SET code = $1, code = $2, content = $3, update_dt = NOW() WHERE idx = $4',
            [ingredient_code, material_code, content, idx]
        );
        res.json({ message: '데이터가 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error("PUT 요청 에러:", error);
        res.status(500).json({ error: '데이터 수정 실패' });
    }
});

// DELETE: 특정 ID 데이터 삭제 (idx 기준)
router.delete('/material_ingredient/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);

    try {
        await pool.query('DELETE FROM pps.tb_material_ingredient WHERE idx = $1', [idx]);
        res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error("DELETE 요청 에러:", error);
        res.status(500).json({ error: '데이터 삭제 실패' });
    }
});

// DELETE: 특정 ID 데이터 삭제 (idx 기준)
router.delete('/material_ingredient/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    pool.query('DELETE FROM pps.tb_material_ingredient WHERE idx = $1', [idx], (error) => {
        if (error) {
            console.error("DELETE 요청 에러:", error);
            res.status(500).json({ error: '데이터 삭제 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
        }
    });
});

// --------------------------4. tb_material_master-------------------------------
// 데이터베이스 컬럼 정의
const materialMasterColumns = ['code', 'name'];

// GET: 모든 데이터 조회
router.get('/material_master', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM pps.tb_material_master');
        res.json(results.rows);
    } catch (error) {
        console.error("GET 요청 에러:", error);
        res.status(500).json({ error: '데이터 조회 실패' });
    }
});

// GET: 특정 ID 데이터 조회 (idx 기준)
router.get('/material_master/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);

    try {
        const results = await pool.query('SELECT * FROM pps.tb_material_master WHERE idx = $1', [idx]);
        if (results.rows.length === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json(results.rows[0]);
        }
    } catch (error) {
        console.error("GET (ID) 요청 에러:", error);
        res.status(500).json({ error: '데이터 조회 실패' });
    }
});

// POST: 새로운 데이터 추가
router.post('/material_master', async (req, res) => {
    const { code, name } = req.body;

    // 데이터 유효성 검사 (필수 필드 존재 여부 확인)
    if (!code || !name) {
        return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
    }

    try {
        const results = await pool.query(
            'INSERT INTO pps.tb_material_master (code, name) VALUES ($1, $2) RETURNING *',
            [code, name]
        );
        res.status(201).json(results.rows[0]); // 새로 추가된 데이터 반환
    } catch (error) {
        console.error("POST 요청 에러:", error);
        res.status(500).json({ error: '데이터 추가 실패' });
    }
});

// PUT: 특정 ID 데이터 수정 (idx 기준)
router.put('/material_master/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);
    const { code, name } = req.body;

    try {
        const results = await pool.query(
            'UPDATE pps.tb_material_master SET code = $1, name = $2 WHERE idx = $3 RETURNING *',
            [code, name, idx]
        );

        if (results.rows.length === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json(results.rows[0]); // 수정된 데이터 반환
        }
    } catch (error) {
        console.error("PUT 요청 에러:", error);
        res.status(500).json({ error: '데이터 수정 실패' });
    }
});

// DELETE: 특정 ID 데이터 삭제 (idx 기준)
router.delete('/material_master/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);

    try {
        const results = await pool.query('DELETE FROM pps.tb_material_master WHERE idx = $1', [idx]);
        if (results.rowCount === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
        }
    } catch (error) {
        console.error("DELETE 요청 에러:", error);
        res.status(500).json({ error: '데이터 삭제 실패' });
    }
});
// --------------------------5. tb_ingredient_master-------------------------------
// ingredientMasterColumns 정의 (필요한 경우 추가 필드 포함)
const ingredientMasterColumns = ['code', 'name', 'create_dt', 'update_dt'];

// GET: 모든 데이터 조회
router.get('/ingredient_master', (req, res) => {
    pool.query('SELECT * FROM pps.tb_ingredient_master', (error, results) => {
        if (error) {
            console.error("GET 요청 에러:", error);
            res.status(500).json({ error: '데이터 조회 실패' });
        } else {
            res.json(results.rows);
        }
    });
});

// GET: 특정 ID 데이터 조회 (idx 기준)
router.get('/ingredient_master/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    pool.query('SELECT * FROM pps.tb_ingredient_master WHERE idx = $1', [idx], (error, results) => {
        if (error) {
            console.error("GET (ID) 요청 에러:", error);
            res.status(500).json({ error: '데이터 조회 실패' });
        } else if (results.rows.length === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json(results.rows[0]);
        }
    });
});

// POST: 새로운 데이터 추가
router.post('/ingredient_master', (req, res) => {
    const { code, name } = req.body;

    // 데이터 유효성 검사
    if (!code || !name) {
        return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
    }

    // 현재 날짜/시간을 create_dt 및 update_dt에 할당
    const now = new Date();
    const create_dt = now.toISOString();
    const update_dt = now.toISOString();

    pool.query(
        'INSERT INTO pps.tb_ingredient_master (code, name, create_dt, update_dt) VALUES ($1, $2, $3, $4)',
        [code, name, create_dt, update_dt],
        (error) => {
            if (error) {
                console.error("POST 요청 에러:", error);
                res.status(500).json({ error: '데이터 추가 실패' });
            } else {
                res.status(201).json({ message: '데이터가 성공적으로 추가되었습니다.' }); // 201 Created 상태 코드 사용
            }
        }
    );
});

// PUT: 특정 ID 데이터 수정 (idx 기준)
router.put('/ingredient_master/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);
    const { code, name } = req.body;

    // 데이터 유효성 검사 (필요에 따라 추가)
    if (!code || !name) {
        return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
    }

    // 현재 날짜/시간을 update_dt에 할당
    const now = new Date();
    const update_dt = now.toISOString();

    pool.query(
        'UPDATE pps.tb_ingredient_master SET code = $1, name = $2, update_dt = $3 WHERE idx = $4',
        [code, name, update_dt, idx],
        (error, results) => {
            if (error) {
                console.error("PUT 요청 에러:", error);
                res.status(500).json({ error: '데이터 수정 실패' });
            } else if (results.rowCount === 0) { // 수정된 행이 없으면 404 반환
                res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
            } else {
                res.json({ message: '데이터가 성공적으로 수정되었습니다.' });
            }
        }
    );
});

// DELETE: 특정 ID 데이터 삭제 (idx 기준)
router.delete('/ingredient_master/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    pool.query('DELETE FROM pps.tb_ingredient_master WHERE idx = $1', [idx], (error, results) => {
        if (error) {
            console.error("DELETE 요청 에러:", error);
            res.status(500).json({ error: '데이터 삭제 실패' });
        } else if (results.rowCount === 0) { // 삭제된 행이 없으면 404 반환
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
        }
    });
});

// --------------------------6. tb_sticky_material-------------------------------
// 컬럼 이름 배열
const stickyMaterialColumns = [
    'code','name','AD_FORCE','6000486','6000510','6000514','6000519','6000523','6000524','6000572','6000612','6000619','6005864','6006302','6006689','6006792','6007345','6007357','6007361','6007404','6007598','6007708','6008261','6008262','6008981','6010244','6010952','6011881','6012211','6015318','6017056','6017414','6017710','6017715','6018063','6018436','6019904','6020180','6020182','6022844','6023385','6023778','6024353','6024647','6024650','6024749','6024806','6024870','6025043','6025563','6025729','6025757','6025788','6025892','6025928','6026178','6026665','create_dt','update_dt'
];
// GET: 모든 데이터 조회
router.get('/sticky_material', async (req, res) => {
    const selectColumns = stickyMaterialColumns.map(column => `"${column}"`).join(', ');
    const query = `SELECT ${selectColumns} FROM pps.tb_sticky_material`;

    pool.query(query, (error, results) => {
        if (error) {
            console.error("GET 요청 에러:", error);
            res.status(500).json({ error: '데이터 조회 실패' });
        } else {
            res.json(results.rows);
        }
    });
});

// GET: 특정 code 데이터 조회
router.get('/sticky_material/idx', async (req, res) => {
    const idx = parseInt(req.params.idx);
    const query = `SELECT ${stickyIngredientColumns.join(', ')} FROM pps.tb_sticky_material WHERE idx = $1`;

    pool.query(query, [idx], (error, results) => {
        if (error) {
            console.error("GET (ID) 요청 에러:", error);
            res.status(500).json({ error: '데이터 조회 실패' });
        } else if (results.rows.length === 0) {
            res.status(404).json({ error: '해당 ID를 가진 데이터가 없음' });
        } else {
            res.json(results.rows[0]);
        }
    });
});

// POST: 새로운 데이터 추가
router.post('/sticky_material', (req, res) => {
    // 1. 모든 요청 데이터 가져오기
    const requestData = req.body;

    // 2. 유효성 검사: code, name 필수 여부 확인
    if (!requestData.code || !requestData.name) {
        return res.status(400).json({ error: '필수 필드(code, name)가 누락되었습니다.' });
    }

    // 3. DB 쿼리 생성
    const columns = [];
    const values = [];
    const placeholders = [];

    // stickyMaterialColumns 순서대로 데이터 처리
    stickyMaterialColumns.forEach((column, index) => {
        // 컬럼 이름 추가
        columns.push(`"${column}"`);

        // 요청 데이터에 해당 컬럼 값이 있는 경우
        if (requestData[column] !== undefined) {
            values.push(requestData[column]);
            placeholders.push(`$${index + 1}`);
        } else {
            // 컬럼 값이 없는 경우 NULL 삽입
            values.push(null);
            placeholders.push('NULL');
        }
    });

    const query = `
    INSERT INTO pps.tb_sticky_material (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
  `;

    // 4. 쿼리 실행
    pool.query(query, values, (error) => {
        if (error) {
            console.error("POST 요청 에러:", error);
            res.status(500).json({ error: '데이터 추가 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 추가되었습니다.' });
        }
    });
});

// PUT: 특정 ID 데이터 수정 (idx 기준)
router.put('/sticky_material/:idx', (req, res) => {
    const idx = parseInt(req.params.idx);

    // stickyMaterialColumns 배열을 순회하며 업데이트 쿼리 생성
    const setStatements = stickyMaterialColumns.map((column, index) => {
        // 요청 본문에 해당 컬럼의 값이 존재하면 업데이트 쿼리에 포함
        if (req.body[column] !== undefined) {
            return `"${column}" = $${index + 1}`;
        } else {
            return null;
        }
    }).filter(statement => statement !== null) // null 값 제거
        .join(', ');

    // 업데이트할 값 배열 생성
    const values = stickyMaterialColumns.map(column => {
        return req.body[column] !== undefined ? req.body[column] : null;
    }).filter(value => value !== null); // null 값 제거

    // idx 추가
    values.push(idx);

    // 쿼리 조합
    const query = `
    UPDATE pps.tb_sticky_material
    SET ${setStatements}
    WHERE idx = $${values.length}
  `;

    pool.query(query, values, (error) => {
        if (error) {
            console.error("PUT 요청 에러:", error);
            res.status(500).json({ error: '데이터 수정 실패' });
        } else {
            res.json({ message: '데이터가 성공적으로 수정되었습니다.' });
        }
    });
});

// DELETE: 특정 ID 데이터 삭제 (idx 기준)
router.delete('/sticky_material/:idx', async (req, res) => {
    const idx = parseInt(req.params.idx);

    try {
        await pool.query('DELETE FROM pps.tb_sticky_material WHERE idx = $1', [idx]);
        res.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error("DELETE 요청 에러:", error);
        res.status(500).json({ error: '데이터 삭제 실패' });
    }
});


module.exports = router;
