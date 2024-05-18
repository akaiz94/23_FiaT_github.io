
$(document).ready(function () {

    console.log('solution_questionnaire2 page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));



    $('#scalpSurvey_saveButton').click(function () {

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("두피 저장버튼 클릭 : ");

        /*
       * #Q1-1 두피고민 저장
        */
        const checkboxes = document.querySelectorAll('input[name="q_start"]');
        const Q1_1 = {};

        checkboxes.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q1_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q1_1 : ", Q1_1);


        /*
        * #Q1-1. 두피고민 1순위저장
         */
        const S1_First_Input = document.getElementById('S1_First');
        let S1_First = '';

        if (S1_First_Input) {
            S1_First = S1_First_Input.value;
        }
        console.log('S1_First :', S1_First);

        /*
        * # 2-1 평소 샴푸를 언제 하나요?
        */
        const checkboxes2 = document.querySelectorAll('input[name="q1"]');
        const Q2_1 = {};

        checkboxes2.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q2_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q2_1 : ", Q2_1);



        /*
        * # 2-2 샴푸 사용 횟수는 어떻게 되나요?
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
       * #2-3 샴푸 후 두피를 충분히 건조시키나요?
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
       * #2-4 헤어 제품을 바꾸거나 시술 후 두피가 예민하게 반응하는 편인가요?
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
       * #2-5 헤어 제품을 바꾸거나 시술 후에 비듬이 생기는 편인가요?
        */
        const S2_5_radio1 = document.getElementById('S2_5_001');
        const S2_5_radio2 = document.getElementById('S2_5_002');
        const S2_5_radio3 = document.getElementById('S2_5_003');
        const S2_5_radio4 = document.getElementById('S2_5_004');

        let S2_5 = null;

        if (S2_5_radio1.checked) {
            S2_5 = 0;
        } else if (S2_5_radio2.checked) {
            S2_5 = 1;
        } else if (S2_5_radio3.checked) {
            S2_5 = 2;
        } else if (S2_5_radio4.checked) {
            S2_5 = 3;
        }
        console.log('S2_5 :', S2_5);

        /*
       * #2-6 민감성 두피라고 생각하나요?
        */
        const S2_6_radio1 = document.getElementById('S2_6_001');
        const S2_6_radio2 = document.getElementById('S2_6_002');
        const S2_6_radio3 = document.getElementById('S2_6_003');
        const S2_6_radio4 = document.getElementById('S2_6_004');

        let S2_6 = null;

        if (S2_6_radio1.checked) {
            S2_6 = 0;
        } else if (S2_6_radio2.checked) {
            S2_6 = 1;
        } else if (S2_6_radio3.checked) {
            S2_6 = 2;
        } else if (S2_6_radio4.checked) {
            S2_6 = 3;
        }
        console.log('S2_6 :', S2_6);

       /*
       * #2-7 평소 두피에 열감이 느껴지나요?
       */
        const S2_7_radio1 = document.getElementById('S2_7_001');
        const S2_7_radio2 = document.getElementById('S2_7_002');
        const S2_7_radio3 = document.getElementById('S2_7_003');
        const S2_7_radio4 = document.getElementById('S2_7_004');

        let S2_7 = null;

        if (S2_7_radio1.checked) {
            S2_7 = 0;
        } else if (S2_7_radio2.checked) {
            S2_7 = 1;
        } else if (S2_7_radio3.checked) {
            S2_7 = 2;
        } else if (S2_7_radio4.checked) {
            S2_7 = 3;
        }
        console.log('S2_7 :', S2_7);

        /*
        * #2-8 평소 두피가 울긋불긋 한 편인가요?
        */
        const S2_8_radio1 = document.getElementById('S2_8_001');
        const S2_8_radio2 = document.getElementById('S2_8_002');
        const S2_8_radio3 = document.getElementById('S2_8_003');
        const S2_8_radio4 = document.getElementById('S2_8_004');

        let S2_8 = null;

        if (S2_8_radio1.checked) {
            S2_8 = 0;
        } else if (S2_8_radio2.checked) {
            S2_8 = 1;
        } else if (S2_8_radio3.checked) {
            S2_8 = 2;
        } else if (S2_8_radio4.checked) {
            S2_8 = 3;
        }
        console.log('S2_8 :', S2_8);


        /*
        * #2-9 건조, 계절 변화, 미세먼지 등 환경요인에 의해 두피가 예민하게 반응하나요?
        */
        const S2_9_radio1 = document.getElementById('S2_9_001');
        const S2_9_radio2 = document.getElementById('S2_9_002');
        const S2_9_radio3 = document.getElementById('S2_9_003');
        const S2_9_radio4 = document.getElementById('S2_9_004');

        let S2_9 = null;

        if (S2_9_radio1.checked) {
            S2_9 = 0;
        } else if (S2_9_radio2.checked) {
            S2_9 = 1;
        } else if (S2_9_radio3.checked) {
            S2_9 = 2;
        } else if (S2_9_radio4.checked) {
            S2_9 = 3;
        }
        console.log('S2_9 :', S2_9);


        /*
        * #2-10 두피에 뾰루지가 생기는 정도는 어떤가요?
        */
        const S2_10_radio1 = document.getElementById('S2_10_001');
        const S2_10_radio2 = document.getElementById('S2_10_002');
        const S2_10_radio3 = document.getElementById('S2_10_003');
        const S2_10_radio4 = document.getElementById('S2_10_004');

        let S2_10 = null;

        if (S2_10_radio1.checked) {
            S2_10 = 0;
        } else if (S2_10_radio2.checked) {
            S2_10 = 1;
        } else if (S2_10_radio3.checked) {
            S2_10 = 2;
        } else if (S2_10_radio4.checked) {
            S2_10 = 3;
        }
        console.log('S2_10 :', S2_10);


        /*
        * #2-11 평소에 두피가 가려운 정도는 어떤가요?
        */
        const S2_11_radio1 = document.getElementById('S2_11_001');
        const S2_11_radio2 = document.getElementById('S2_11_002');
        const S2_11_radio3 = document.getElementById('S2_11_003');
        const S2_11_radio4 = document.getElementById('S2_11_004');
        const S2_11_radio5 = document.getElementById('S2_11_005');
        const S2_11_radio6 = document.getElementById('S2_11_006');

        let S2_11 = null;

        if (S2_11_radio1.checked) {
            S2_11 = 0;
        } else if (S2_11_radio2.checked) {
            S2_11 = 1;
        } else if (S2_11_radio3.checked) {
            S2_11 = 2;
        } else if (S2_11_radio4.checked) {
            S2_11 = 3;
        } else if (S2_11_radio5.checked) {
            S2_11 = 4;
        } else if (S2_11_radio6.checked) {
            S2_11 = 5
        }
        console.log('S2_11 :', S2_11);


        /*
        * #3-1 모발 고민을 선택해 주세요.
        */
        const checkboxes3 = document.querySelectorAll('input[name="q3_1"]');
        const Q3_1 = {};

        checkboxes3.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q3_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q3_1 : ", Q3_1);

        
        /*
        * #Q3-1. 모발고민 1순위저장
         */
        const S3_1_First_Input = document.getElementById('S3_1_First');
        let S3_1_First = '';

        if (S3_1_First_Input) {
            S3_1_First = S3_1_First_Input.value;
        }
        console.log('S3_1_First :', S3_1_First);        



        /*
        * #3-2 귀하의 모발 타입은 다음 중 어디에 해당 하나요?        */
   
        const S3_2_radio1 = document.getElementById('S3_2_001');
        const S3_2_radio2 = document.getElementById('S3_2_002');
        const S3_2_radio3 = document.getElementById('S3_2_003');
        let S3_2 = null;

        if (S3_2_radio1.checked) {
            S3_2 = 0;
        } else if (S3_2_radio2.checked) {
            S3_2 = 1;
        } else if (S3_2_radio3.checked) {
            S3_2 = 2;
        } 
        console.log('S3_2 :', S3_2);


        window.location.href = './analysis.html';

        
    })

});
