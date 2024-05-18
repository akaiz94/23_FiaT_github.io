var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}

$(document).ready(function () {

    console.log('solution_questionnaire page start -> ')

    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

    $('#skinSurvey_saveButton').click(function () {

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

        console.log("스킨 저장버튼 클릭 : ");

        /*
        * #Q1-1 피부고민 저장
         */
        // HTML에서 체크박스 요소
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        // 체크 여부를 저장할 객체를 생성
        const Q1_1 = {};
        // 체크박스 요소들을 순회하며 클릭 여부를 확인하고 객체에 저장
        checkboxes.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q1_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q1_1 : ", Q1_1);



        /*
        * #Q1-1 피부고민 1순위 저장
         */

        const S1_First_Input = document.getElementById('S1_First');
        const S1_Second_Input = document.getElementById('S1_Second');

        let S1_First = '';
        let S1_Second = '';

        if (S1_First_Input) {
            S1_First = S1_First_Input.value;
        }
        if (S1_Second_Input) {
            S1_Second = S1_Second_Input.value;
        }
        console.log('S1_First :', S1_First);
        console.log('S1_Second :', S1_Second);


        /*
        * #2-1 세안 후 아무것도 안바르면 피부가 당겨요.
         */
        const S2_1_radio1 = document.getElementById('S2_1_001');
        const S2_1_radio2 = document.getElementById('S2_1_002');
        const S2_1_radio3 = document.getElementById('S2_1_003');
        const S2_1_radio4 = document.getElementById('S2_1_004');

        // 변수 S2_1을 선언하고 초기값을 설정합니다.
        let S2_1 = null;

        // 라디오 버튼의 클릭 여부를 확인하고 변수에 값을 할당합니다.
        if (S2_1_radio1.checked) {
            S2_1 = 0;
        } else if (S2_1_radio2.checked) {
            S2_1 = 1;
        } else if (S2_1_radio3.checked) {
            S2_1 = 2;
        } else if (S2_1_radio4.checked) {
            S2_1 = 3;
        }
        console.log('S2_1 :', S2_1);

        /*
        * #2-2 보습제를 발라도 3~4시간이 지나면 피부가 건조해요.
         */
        const S2_2_radio1 = document.getElementById('S2_2_001');
        const S2_2_radio2 = document.getElementById('S2_2_002');
        const S2_2_radio3 = document.getElementById('S2_2_003');
        const S2_2_radio4 = document.getElementById('S2_2_004');

        let S2_2 = null;

        if (S2_2_radio1.checked) {
            S2_2 = 0;
        } else if (S2_2_radio2.checked) {
            S2_2 = 1;
        } else if (S2_2_radio3.checked) {
            S2_2 = 2;
        } else if (S2_2_radio4.checked) {
            S2_2 = 3;
        }
        console.log('S2_2 :', S2_2);


        /*
        * #2-3 피부가 번들거리는 편인가요?
         */
        const S2_3_radio1 = document.getElementById('S2_3_001');
        const S2_3_radio2 = document.getElementById('S2_3_002');
        const S2_3_radio3 = document.getElementById('S2_3_003');
        const S2_3_radio4 = document.getElementById('S2_3_004');

        let S2_3 = null;

        if (S2_3_radio1.checked) {
            S2_3 = 0;
        } else if (S2_3_radio2.checked) {
            S2_3 = 1;
        } else if (S2_3_radio3.checked) {
            S2_3 = 2;
        } else if (S2_3_radio4.checked) {
            S2_3 = 3;
        }
        console.log('S2_3 :', S2_3);

        /*
        * #2-4 자신의 얼굴 모공에 대해 어떻게 생각하나요?
         */
        const S2_4_radio1 = document.getElementById('S2_4_001');
        const S2_4_radio2 = document.getElementById('S2_4_002');
        const S2_4_radio3 = document.getElementById('S2_4_003');
        const S2_4_radio4 = document.getElementById('S2_4_004');

        let S2_4 = null;

        if (S2_4_radio1.checked) {
            S2_4 = 0;
        } else if (S2_4_radio2.checked) {
            S2_4 = 1;
        } else if (S2_4_radio3.checked) {
            S2_4 = 2;
        } else if (S2_4_radio4.checked) {
            S2_4 = 3;
        }
        console.log('S2_4 :', S2_4);

        /*
        * #3-1 자외선 차단제를 사용해요.
         */
        const S3_1_radio1 = document.getElementById('S3_1_001');
        const S3_1_radio2 = document.getElementById('S3_1_002');
        const S3_1_radio3 = document.getElementById('S3_1_003');
        const S3_1_radio4 = document.getElementById('S3_1_004');

        let S3_1 = null;

        if (S3_1_radio1.checked) {
            S3_1 = 0;
        } else if (S3_1_radio2.checked) {
            S3_1 = 1;
        } else if (S3_1_radio3.checked) {
            S3_1 = 2;
        } else if (S3_1_radio4.checked) {
            S3_1 = 3;
        }
        console.log('S3_1 :', S3_1);

        /*
       * #3-2 담배를 피우거나 간접흡연에 노출되어 있어요.
        */
        const S3_2_radio1 = document.getElementById('S3_2_001');
        const S3_2_radio2 = document.getElementById('S3_2_002');
        const S3_2_radio3 = document.getElementById('S3_2_003');
        const S3_2_radio4 = document.getElementById('S3_2_004');

        let S3_2 = null;

        if (S3_2_radio1.checked) {
            S3_2 = 0;
        } else if (S3_2_radio2.checked) {
            S3_2 = 1;
        } else if (S3_2_radio3.checked) {
            S3_2 = 2;
        } else if (S3_2_radio4.checked) {
            S3_2 = 3;
        }
        console.log('S3_2 :', S3_2);

        /*
      * #3-3 스트레스를 많이 받는 편이에요.
       */
        const S3_3_radio1 = document.getElementById('S3_3_001');
        const S3_3_radio2 = document.getElementById('S3_3_002');
        const S3_3_radio3 = document.getElementById('S3_3_003');
        const S3_3_radio4 = document.getElementById('S3_3_004');

        let S3_3 = null;

        if (S3_3_radio1.checked) {
            S3_3 = 0;
        } else if (S3_3_radio2.checked) {
            S3_3 = 1;
        } else if (S3_3_radio3.checked) {
            S3_3 = 2;
        } else if (S3_3_radio4.checked) {
            S3_3 = 3;
        }
        console.log('S3_3 :', S3_3);

        /*
        * #3-4 충분히 잠을 자요.
        */
        const S3_4_radio1 = document.getElementById('S3_4_001');
        const S3_4_radio2 = document.getElementById('S3_4_002');
        const S3_4_radio3 = document.getElementById('S3_4_003');
        const S3_4_radio4 = document.getElementById('S3_4_004');

        let S3_4 = null;

        if (S3_4_radio1.checked) {
            S3_4 = 0;
        } else if (S3_4_radio2.checked) {
            S3_4 = 1;
        } else if (S3_4_radio3.checked) {
            S3_4 = 2;
        } else if (S3_4_radio4.checked) {
            S3_4 = 3;
        }
        console.log('S3_4 :', S3_4);

        /*
        * #3-5 피부과 시술을 자주 받는 편이에요.
        */
        const S3_5_radio1 = document.getElementById('S3_5_001');
        const S3_5_radio2 = document.getElementById('S3_5_002');
        const S3_5_radio3 = document.getElementById('S3_5_003');
        const S3_5_radio4 = document.getElementById('S3_5_004');
        const S3_5_radio5 = document.getElementById('S3_5_005');

        let S3_5 = null;

        if (S3_5_radio1.checked) {
            S3_5 = 0;
        } else if (S3_5_radio2.checked) {
            S3_5 = 1;
        } else if (S3_5_radio3.checked) {
            S3_5 = 2;
        } else if (S3_5_radio4.checked) {
            S3_5 = 3;
        } else if (S3_5_radio5.checked) {
            S3_5 = 4;
        }
        console.log('S3_5 :', S3_5);


        /*
        * #3-6 임신과 출산 경험이 있어요.
        */
        const S3_6_radio1 = document.getElementById('S3_6_001');
        const S3_6_radio2 = document.getElementById('S3_6_002');


        let S3_6 = null;

        if (S3_6_radio1.checked) {
            S3_6 = 0;
        } else if (S3_6_radio2.checked) {
            S3_6 = 1;
        }
        console.log('S3_6 :', S3_6);

        
        /*
        * #4-1 생리, 스트레스 등에 의해 피부가 예민하게 반응해요.
        */
        const S4_1_radio1 = document.getElementById('S4_1_001');
        const S4_1_radio2 = document.getElementById('S4_1_002');
        const S4_1_radio3 = document.getElementById('S4_1_003');
        const S4_1_radio4 = document.getElementById('S4_1_004');

        let S4_1 = null;

        if (S4_1_radio1.checked) {
            S4_1 = 0;
        } else if (S4_1_radio2.checked) {
            S4_1 = 1;
        } else if (S4_1_radio3.checked) {
            S4_1 = 2;
        } else if (S4_1_radio4.checked) {
            S4_1 = 3;
        }
        console.log('S4_1 :', S4_1);


        /*
        * #4-2 건조, 계절 변화, 미세먼지 등 환경요인에 의해 피부가 예민하게 반응해요.
        */
        const S4_2_radio1 = document.getElementById('S4_2_001');
        const S4_2_radio2 = document.getElementById('S4_2_002');
        const S4_2_radio3 = document.getElementById('S4_2_003');
        const S4_2_radio4 = document.getElementById('S4_2_004');

        let S4_2 = null;

        if (S4_2_radio1.checked) {
            S4_2 = 0;
        } else if (S4_2_radio2.checked) {
            S4_2 = 1;
        } else if (S4_2_radio3.checked) {
            S4_2 = 2;
        } else if (S4_2_radio4.checked) {
            S4_2 = 3;
        }
        console.log('S4_2 :', S4_2);


        /*
        * #4-3 화장품을 바꾸면 피부가 예민하게 반응하는 편인가요?
        */
        const S4_3_radio1 = document.getElementById('S4_3_001');
        const S4_3_radio2 = document.getElementById('S4_3_002');
        const S4_3_radio3 = document.getElementById('S4_3_003');
        const S4_3_radio4 = document.getElementById('S4_3_004');

        let S4_3 = null;

        if (S4_3_radio1.checked) {
            S4_3 = 0;
        } else if (S4_3_radio2.checked) {
            S4_3 = 1;
        } else if (S4_3_radio3.checked) {
            S4_3 = 2;
        } else if (S4_3_radio4.checked) {
            S4_3 = 3;
        }
        console.log('S4_3 :', S4_3);


        /*
        * #4-4 얼굴에 뾰루지가 생기는 정도는 어떤가요?
        */
        const S4_4_radio1 = document.getElementById('S4_4_001');
        const S4_4_radio2 = document.getElementById('S4_4_002');
        const S4_4_radio3 = document.getElementById('S4_4_003');
        const S4_4_radio4 = document.getElementById('S4_4_004');

        let S4_4 = null;

        if (S4_4_radio1.checked) {
            S4_4 = 0;
        } else if (S4_4_radio2.checked) {
            S4_4 = 1;
        } else if (S4_4_radio3.checked) {
            S4_4 = 2;
        } else if (S4_4_radio4.checked) {
            S4_4 = 3;
        }
        console.log('S4_4 :', S4_4);

        /*
        * #4-5 얼굴에 붉은기가 있는 편인가요?
        */
        const S4_5_radio1 = document.getElementById('S4_5_001');
        const S4_5_radio2 = document.getElementById('S4_5_002');
        const S4_5_radio3 = document.getElementById('S4_5_003');
        const S4_5_radio4 = document.getElementById('S4_5_004');

        let S4_5 = null;

        if (S4_5_radio1.checked) {
            S4_5 = 0;
        } else if (S4_5_radio2.checked) {
            S4_5 = 1;
        } else if (S4_5_radio3.checked) {
            S4_5 = 2;
        } else if (S4_5_radio4.checked) {
            S4_5 = 3;
        }
        console.log('S4_5 :', S4_5);

        /*
        * #4-6 햇빛에 의한 열감을 경험한 적이 있나요?
        */
        const S4_6_radio1 = document.getElementById('S4_6_001');
        const S4_6_radio2 = document.getElementById('S4_6_002');
        const S4_6_radio3 = document.getElementById('S4_6_003');
        const S4_6_radio4 = document.getElementById('S4_6_004');

        let S4_6 = null;

        if (S4_6_radio1.checked) {
            S4_6 = 0;
        } else if (S4_6_radio2.checked) {
            S4_6 = 1;
        } else if (S4_6_radio3.checked) {
            S4_6 = 2;
        } else if (S4_6_radio4.checked) {
            S4_6 = 3;
        }
        console.log('S4_6 :', S4_6);
        




        // $.ajax({
        //     // url: SkinSurvey_API_URL + surveyNo,
        //     url: vapometer_API_URL,
        //     type: 'POST',
        //     contentType: 'application/json',
        //     body: requestData,

        //     success: function (response) {
        //         console.log("vapometer_API_URL 응답값 : ", response);


        //     }, error: function (xhr, status, error) {
        //         console.error('vapometer_API_URL 오류 : ', error);
        //     }
        // })
        

        window.location.href = './solution_questionnaire2.html';


    })


});

