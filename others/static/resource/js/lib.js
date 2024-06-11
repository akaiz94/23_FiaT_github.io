const process = {
    open: { body: document.body, checkClass: 'run' },
    run: function () { this.open.body.classList.add(this.open.checkClass); },
    end: function () { this.open.body.classList.remove(this.open.checkClass); },
    check: function () { return this.open.body.classList.contains(this.open.checkClass); }
}
// 페이지 로딩 후 실행
document.addEventListener('DOMContentLoaded', () => {
    menu.createHeaderMenu();
    menu.updateLoginButton(); // 페이지 로딩 시 로그인 버튼 상태 업데이트
});

const setUi = {
    init: function () {
        setMenu.init();
        setPopup.init();
        setSurvey.init();
    },
    popup: {
        open: (popup, fn) => {
            if (typeof popup == "string") { popup = document.querySelector(popup); }
            setPopup.open(popup);
            if (typeof fn == "function") { fn() }
        },
        close: (popup, fn) => {
            if (typeof popup == "string") { popup = document.querySelector(popup); }
            setPopup.close(popup);
            if (typeof fn == "function") { fn() }
        }
    },
    survey: {
        next: (fn) => {
            setSurvey.next(fn);
        },
        prev: (fn) => {
            setSurvey.prev(fn);
        },
        reset: (fn) => {
            setSurvey.reset(fn);
        }
    }
}

const menu = {
    createHeaderMenu: function () {
        var header = `
            <div class="container">
                <a href="./index.html" class="logo-item">
                    <img src="./resource/images/logo.svg" alt="amore city lab">
                </a>
                <nav class="menu-box">
                    <ul class="menu-list">
                        <li class="menu-item">
                            <a style="color : black;">소개</a>
                            <ul class="submenu-list">
                                <li class="submenu-item"><a href="./introduction_about.html">아모레 시티랩</a></li>
                                <li class="submenu-item"><a href="">분석기기</a></li>
                                <li class="submenu-item"><a href="">주요 서비스</a></li>
                                <li class="submenu-item"><a href="">피부 전문가</a></li>
                            </ul>
                        </li>
                        <li class="menu-item">
                            <a style="color : black;">마이 스킨 솔루션</a>
                            <ul class="submenu-list">
                                <li class="submenu-item "><a href="./solution_reservation.html">예약 확인</a></li>
                                <li class="submenu-item"><a href="https://citylab.amorepacific.com/agreement_CityLab/Login.aspx" target="_blank">정보제공 동의</a></li>
                                <li class="submenu-item">
                                    <a>문진</a>
                                    <ul class="submenu2-list">
                                        <li class="submenu2-item"><a href="./solution_questionnaire.html">피부</a></li>
                                        <li class="submenu2-item"><a href="./solution_questionnaire2.html">두피 모발</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <a>분석</a>
                                    <ul class="submenu2-list">
                                        <li class="submenu2-item "><a href="./analysis.html">피부 측정</a></li>
                                        <li class="submenu2-item"><a href="./analysis_result.html">피부 측정 결과</a></li>
                                        <li class="submenu2-item "><a href="./analysis2.html">두피<span
                                                    class="dat"></span>모발 측정</a></li>
                                        <li class="submenu2-item"><a href="./analysis2_result.html">두피<span class="dat"></span>모발 측정 결과</a></li>
                                        <li class="submenu2-item"><a href="./analysis3_result.html">MY SKIN DNA</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <a>상담</a>
                                    <ul class="submenu2-list">
                                        <li class="submenu2-item"><a href="./solution_counsel.html">솔루션 제안</a>
                                        </li>
                                        <li class="submenu2-item"><a href="./solution_counsel2.html">보고서 제공</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="menu-item">
                            <a style="color : black;">통계</a>
                            <ul class="submenu-list">
                                <li class="submenu-item"><a href="./statistics_result.html">실적</a></li>     
                                <li class="submenu-item"><a>데이터 분석</a>
                                <ul class="submenu2-list">
                                      <li class="submenu2-item "><a href="./statistics_skin_season.html">피부</a></li>
                                      <li class="submenu2-item"><a href="./statistics_head_season.html">두피<span class="dat"></span>모발</a></li>                                      
                                </ul>    
                            </ul>
                        </li>
                        <!--
                        <li class="menu-item">
                            <a style="color : black;">관리자</a>
                            <ul class="submenu-list">
                                <li class="submenu-item">
                                    <a>조회</a>
                                    <ul class="submenu2-list">
                                        <li class="submenu2-item"><a href="./administrator_inquiry.html">고객 솔루션</a></li>
                                        <li class="submenu2-item"><a href="./administrator_settings.html">고객 보고서</a></li>
                                    </ul>                                    
                                </li>
                                <li class="submenu-item"><a href="./manager_inquiry.html">설정</a></li>
                            </ul>
                        </li>
                        -->
                    </ul>
                </nav>
                <div class="member-box">
                    <div class="member-box">
                        <!--로그인 전-->
                        <a href="./login.html" class="login-button" style="color : black;">로그인</a>
                        <!--로그인 후-->
                        
                    <span class="user-name" style="display: none; color : black;">홍길동</span>
                    <a href="./login.html" class="logout-button" style="display: none; color : black;">로그아웃</a>
                  
                    </div>
                </div>
            </div>
    `;
        $("#top_menu").html(header);

        const managerName = localStorage.getItem('manager_name');
        if(managerName !== null){
            $(".user-name").text(managerName).show();
            $(".logout-button").show();
            $(".login-button").hide();            
        }

        else if(managerName === null){
            $(".logout-button").hide();
            $(".user-name").hide();
            $(".login-button").show();
        }

        $(".logout-button").on("click", function(){
            // localStorage.removeItem('manager_name');   
            localStorage.clear();
        });
    },
    isLogin: function () {
        return localStorage.getItem('access_token') !== null; // access_token 존재 여부 확인
    },

    // 로그인/로그아웃 버튼 업데이트 함수 추가 (lee.D.P)
    // updateLoginButton: function () {
    //     const loginButton = document.querySelector(".login-button");
    //     const logoutButton = document.createElement("a"); // 로그아웃 버튼 동적 생성
    //     logoutButton.href = "./login.html"; // 로그아웃 후 이동할 페이지
    //     logoutButton.classList.add("logout-button");
    //     logoutButton.textContent = "로그아웃";

    //     if (this.isLogin()) {
    //         // 로그인 상태
    //         loginButton.replaceWith(logoutButton); // 로그인 버튼을 로그아웃 버튼으로 대체
    //         logoutButton.addEventListener("click", () => { // 로그아웃 이벤트 처리
    //             this.logout();
    //             this.updateLoginButton(); // 버튼 상태 업데이트
    //             // 로그아웃 후 필요한 동작 수행 (예: 홈페이지로 이동)
    //         });
    //     } else {
    //         // 로그아웃 상태
    //         logoutButton.replaceWith(loginButton); // 로그아웃 버튼을 로그인 버튼으로 대체
    //     }
    // },

    createFooter: function () {
        var footer = `
        <div class="container">
            <!--<div class="row">
                <div class="col-md-12">
                    <div id="quick_menu">
                        <div class="link_01"><a class="ani5" href="#none">위로가기</a></div>
                    </div>
                </div>
            </div>-->
        </div>
    `;
        // document.getElementById("footer").innerHTML   = footer;
    }
}

const setMenu = {
    init: function () {

        const siteHeader = document.querySelector('.site-header');
        const container = siteHeader.querySelector('.menu-box');
        document.querySelectorAll('.menu-box .menu-item').forEach((item) => {
            item.addEventListener('mouseover', () => {
                item.classList.add('open');
                siteHeader.classList.add('submenu-open');
            })
            item.addEventListener('mouseout', () => {
                item.classList.remove('open');
                siteHeader.classList.remove('submenu-open');
            })
            if (item.querySelector('.submenu-list')) {
                item.querySelector('.submenu-list').addEventListener('mouseover', () => {
                    siteHeader.classList.add('submenu-open');
                })
            }
        })


    }
}


const setPopup = {
    option: {
        class: 'open',
        body: document.body,
        bodyClass: 'layerOpen'
    },
    init: function () {
        document.querySelectorAll('.layer-wrap .close-button').forEach((button) => {
            button.addEventListener('click', () => {
                this.close(button.closest('.layer-wrap'));
            })
        })
    },
    open: function (popup) {
        if (popup.classList.contains(this.option.class)) return false;
        this.reset(() => {
            this.option.body.classList.add(this.option.bodyClass)
            popup.classList.add(this.option.class);
        })
    },
    close: function (popup) {
        if (!popup.classList.contains(this.option.class)) return false;
        popup.classList.remove(this.option.class);
        this.option.body.classList.remove(this.option.bodyClass)
        if (popup.querySelector('form')) {
            popup.querySelector('form').reset();
        }
    },
    reset: function (fn) {
        document.querySelectorAll('.layer-wrap').forEach((layer) => {
            layer.classList.remove(this.option.class);

        })
        if (typeof fn == "function") fn();
    }
}

const setSurvey = {
    count: function () {
        return document.querySelectorAll('.survey-form-box .question-box.active').length;
    },
    init: function () {
        this.content = document.querySelector('.survey-form-box');
        if (!this.content) return false;
        this.max = this.content.querySelectorAll('.question-box').length;
        this.content.querySelectorAll('.question-box').forEach((item) => {
            item.addEventListener('transitionend', () => { process.end(); });
        })
    },
    next: function (fn) {
        if (this.count() === this.max) return false;
        if (process.check()) return false;
        process.run();
        this.content.querySelectorAll('.question-box')[this.count()].classList.add('active');
        this.setQuestCount();
        if (typeof fn == "function") { fn() }
    },
    prev: function (fn) {
        if (this.count() === 1) return false;
        if (process.check()) return false;
        process.run();
        this.content.querySelectorAll('.question-box')[this.count() - 1].classList.remove('active');
        this.setQuestCount();
        if (typeof fn == "function") { fn() }
    }
    , setQuestCount: function () {

        this.content.dataset.question = (this.count() === this.max ? 'end' : this.count());
    },
    reset: function (fn) {
        this.content.dataset.question = 1;
        this.content.querySelectorAll('.question-box').forEach((item, index) => {
            if (index > 0) {
                item.classList.remove('active');
            }
        })
        this.content.reset();
        if (typeof fn == "function") { fn() }
    }
}


export { setUi };
