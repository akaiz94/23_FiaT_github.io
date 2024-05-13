using IOPE_LAB.Common;
using IOPE_LAB.Popup;
using IOPE_LAB.UserControls;
using IOPE_LAB_CONTROLS.Base;
using IOPE_LAB_CONTROLS.Entity;
using IOPE_LAB_CONTROLS.Entity.MarkVu;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace IOPE_LAB.Contents.Result
{
    /// <summary>
    /// ResultPage01.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class ResultPage01 : UserControl
    {
        public ResultPage_Data rpd;

        public ResultPage_Data_Entity rpde;

        public ResultPage01()
        {
            InitializeComponent();

            this.Loaded += ResultPage01_Loaded;
            this.grid_inkarea.MouseLeftButtonDown += Grid_inkarea_MouseLeftButtonDown;
            this.grid_stoke.MouseLeftButtonDown += Grid_stoke_MouseLeftButtonDown;
            this.MouseWheel += ResultPage01_MouseWheel;

        }

        private void ResultPage01_MouseWheel(object sender, MouseWheelEventArgs e)
        {
            if (e.Delta > 0)
            {
                SetCustomSolution("UP");
            }
            else
            {
                SetCustomSolution("DOWN");
            }
        }


        private void ResultPage01_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.Key)
            {
                case Key.PageDown: SetCustomSolution("DOWN"); break;
                case Key.PageUp: SetCustomSolution("DOWN"); break;

            }
        }

        private void SetCustomSolution(string isUpDown)
        {
            if (rpd != null)
            {
                rpd.SetCustomSolutionType(tb_solution_type_number.Text, isUpDown);

                tb_solution_type_number.Text = rpd.solution_type_number;
                tb_solution_type_result.Text = rpd.solution_type_result;

                rpde.solution_type_number = rpd.solution_type_number;
                rpde.solution_type_result = rpd.solution_type_result;
                rpde.solution_type_beautytips = rpd.solution_type_beautytips;
            }
        }

        private void Grid_stoke_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            InkCanvasOpen();
        }

        private void InkCanvasOpen()
        {
            Popup_InkCanvas pop_inkcanvas = new Popup_InkCanvas(rpd);

            pop_inkcanvas.ShowDialog();

            rpde.specialtip_img = rpd.specialtip_img = pop_inkcanvas.resultpage_data.specialtip_img;
            rpde.specialtip_stoke_img = rpd.specialtip_stoke_img = pop_inkcanvas.resultpage_data.specialtip_stoke_img;
            rpde.specialtip_memo = rpd.specialtip_memo = pop_inkcanvas.tb_memo.Text;

            //로그 저장
            Common.CommonBiz.LogRecord($"{LoginSession.LoginManagerInfo.ManagerID}님 메모 CLOSE: {pop_inkcanvas.tb_memo.Text}");

            UpdateInkCanvasBindArea();
        }

        private void ResultPage01_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                this.Focus();

                if (LoginSession.SelectedMember != null && LoginSession.SelectedMember != null && LoginSession.SelectedSurvey != null && LoginSession.SelectedM_Markvu_ResultData != null)
                {
                    
                    if (LoginSession.SelectedMember.sex == "M")
                        img_gender.Source = new BitmapImage(new Uri("pack://application:,,,/IOPE_LAB;component/Resources/Images/Result/Result_04.png"));
                    else
                        img_gender.Source = new BitmapImage(new Uri("pack://application:,,,/IOPE_LAB;component/Resources/Images/Result/Result_01.png"));

                    //이름설정
                    txt_result_title02.Text = string.Format("{0} 님", LoginSession.SelectedMember.name);

                    //프로그램명설정
                    if (LoginSession.SelectedMember.PCCD.Equals("PC001013"))
                    {
                        txt_result_title03.Text = string.Format("{0}", "MY SKIN ANALYSIS REPORT");
                    }
                    else {
                        txt_result_title03.Text = string.Format("{0}", LoginSession.SelectedMember.PCCD_NAME);
                    }

                    //측정 연구원 및 측정일자,방문회차 설정 
                    //직사각형 마진 값 설정
                    string searchDate = LoginSession.SelectedMember.rsvn_date.ToString("yyyy-MM-dd").Replace("-", "/");               
                    My_Skin1.Text = "피부 측정 결과보기";

                    if (LoginSession.SelectedMember.PCCD.Equals("PC001001") || LoginSession.SelectedMember.PCCD.Equals("PC001013"))
                    //마이스킨 솔루션
                    {
                        txt_result_title01.Text = "MY SKIN ANALYSIS REPORT FOR : ";
                        txt_result_title01.Margin = new Thickness(0, 0, 100, 0);
                        //txt_result_title04.Margin = new Thickness(0, 0, 115, 0);
                        //txt_result_title05.Margin = new Thickness(0, 0, 115, 0);
                        result_rectangle.Margin = new Thickness(265, -1, 0, 0);
                        txt_result_title04.Width = 260;
                        txt_result_title05.Width = 260;
                    }
                    else if (LoginSession.SelectedMember.PCCD.Equals("PC001012")) 
                    // 이니스프리
                    {
                        result_rectangle.Margin = new Thickness(0, 0, 43, 0);
                        My_Skin1.Margin = new Thickness(114, 8, 220, 0);
                        txt_result_title02.Width = 200;
                        txt_result_title03.Width = 200;
                        txt_result_title04.Width = 270;
                        txt_result_title05.Width = 270;

                    }
                    else 
                    // Basic 
                    {
                        txt_result_title03.Margin = new Thickness(170, 0, 0, 0);
                        txt_result_title04.Margin = new Thickness(170, 0, 0, 0);
                        txt_result_title05.Margin = new Thickness(170, 0, 0, 0);
                        txt_result_title04.Width = 260;
                        txt_result_title05.Width = 260;
                        result_rectangle.Margin = new Thickness(273, -1, 0, 0);
                    }


                    /*
                    
                    첫 방문 고객 일 경우: LoginSession.Selected_C_ResultPageData 객체는 null이 아니지만, 인스턴스 변수는 null임
                    
                    n번 이상 방문 고객 일 경우:  LoginSession.Selected_C_ResultPageData 객체에 대한 인스턴스 정보를 가지고 있기 때문에 null 이 아님

                    Selected_C_ResultPageData 객체 미존재시 사용 ->LoginSession.Selected_C_ResultPageData != null
                    */

                    MemberService.MemberServiceClient msc = new MemberService.MemberServiceClient();
                    DataTable dt = msc.visitCount("IC", LoginSession.SelectedMember.name, LoginSession.SelectedMember.birthdate, LoginSession.SelectedMember.PCCD);

                    if (dt.Rows.Count > 0 && LoginSession.Selected_C_ResultPageData != null)
                    {
                        string visit = dt.Rows.Count > 0 ? dt.Rows[0]["cnt"].ToString() : "0";
                        txt_result_title03.Text += $"   {LoginSession.Selected_C_ResultPageData.manager_value}";
                        txt_result_title04.Text = $"측정일자: {searchDate}";                      
                        txt_result_title05.Text = $"방문회차: {visit}회차";
                        result_rectangle.Visibility = Visibility.Visible;
                        //txt_result_title05.Text = $"방문회차: {1}회차";
                    }

                    rpd = new ResultPage_Data(LoginSession.SelectedM_Markvu_ResultData, LoginSession.SelectedMember, LoginSession.SelectedSurvey);

                    if (LoginSession.Selected_C_ResultPageData != null)
                    {
                        rpd.specialtip_img = LoginSession.Selected_C_ResultPageData.specialtip_img;
                        rpd.specialtip_stoke_img = LoginSession.Selected_C_ResultPageData.specialtip_stoke_img;
                        rpd.specialtip_memo = LoginSession.Selected_C_ResultPageData.specialtip_memo;
                    }


                    rpde = new ResultPage_Data_Entity() { name = LoginSession.SelectedMember.name, surveyNo = LoginSession.SelectedMember.surveyNo, visitKey = LoginSession.SelectedMember.visitKey, surveyDate = LoginSession.SelectedSurvey.surveyDate , userKey = LoginSession.SelectedMember.userkey };

                    //SKIN SUMMARY : 피부점수
                    tb_SkinScore.Text = rpd.skin_score.ToString("N0");
                    rpde.skin_score = rpd.skin_score;

                    //SKIN SUMMARY : 피부고민
                    tb_skin_gomin.Text = rpd.skin_gomin;
                    rpde.skin_gomin = rpd.skin_gomin;

                    //SKIN CONCERN
                    stack_concern.Children.Clear();
                    if (LoginSession.ProgramCourseflg == "B")
                    {
                        stack_concern.ColumnDefinitions.RemoveAt(8);
                    }

                    if (rpd.list_Concern != null && rpd.list_Concern.Count > 0)
                    {
                        rpde.list_Consern_data = new Dictionary<string, int>();
                        rpde.list_Consern_Rpt_data = new Dictionary<string, double>();

                        int cnt = 0;
                        foreach (UC_Result_EllipseText uc_ret in rpd.list_Concern)
                        {
                            rpde.list_Consern_data.Add(uc_ret.Title, GetConvertConsernValue(uc_ret.CenterText));
                            rpde.list_Consern_Rpt_data.Add(uc_ret.Title, uc_ret.Tooltip_Score);
                            stack_concern.Children.Add(uc_ret);
                            Grid.SetColumn(uc_ret, cnt++);
                        }
                    }

                    //SKIN TYPE 복합성 여부
                    if (rpd.IsComplexity == true)
                    {
                        rb_Complexity_yes.IsChecked = true;
                        rb_Complexity_no.IsChecked = false;
                        rpde.IsComplexity = true;
                    }
                    else
                    {
                        rb_Complexity_yes.IsChecked = false;
                        rb_Complexity_no.IsChecked = true;
                        rpde.IsComplexity = false;
                    }

                    //SKIN TYPE T존 영역 Check
                    tb_skintype_t_result.Text = string.Format("T ZONE : {0}", rpd.t_zone_result);

                    ToolTip uc_tzone_tooltip = new ToolTip();
                    uc_tzone_tooltip.Background = Brushes.Transparent;
                    uc_tzone_tooltip.BorderBrush = Brushes.Transparent;
                    uc_tzone_tooltip.Content = new UC_Result_T_U_Zone_Tooltip(rpd.t_zone_subun, rpd.t_zone_ubun);

                    switch (rpd.t_zone_position_num)
                    {
                        case 1: tzone_check1_1.Visibility = Visibility.Visible; tzone_check1_1.ToolTip = uc_tzone_tooltip; break;
                        case 2: tzone_check2_1.Visibility = Visibility.Visible; tzone_check2_1.ToolTip = uc_tzone_tooltip; break;
                        case 3: tzone_check3_1.Visibility = Visibility.Visible; tzone_check3_1.ToolTip = uc_tzone_tooltip; break;
                        case 4: tzone_check1_2.Visibility = Visibility.Visible; tzone_check1_2.ToolTip = uc_tzone_tooltip; break;
                        case 5: tzone_check2_2.Visibility = Visibility.Visible; tzone_check2_2.ToolTip = uc_tzone_tooltip; break;
                        case 6: tzone_check3_2.Visibility = Visibility.Visible; tzone_check3_2.ToolTip = uc_tzone_tooltip; break;
                        case 7: tzone_check1_3.Visibility = Visibility.Visible; tzone_check1_3.ToolTip = uc_tzone_tooltip; break;
                        case 8: tzone_check2_3.Visibility = Visibility.Visible; tzone_check2_3.ToolTip = uc_tzone_tooltip; break;
                        case 9: tzone_check3_3.Visibility = Visibility.Visible; tzone_check3_3.ToolTip = uc_tzone_tooltip; break;
                    }
                    rpde.t_zone_position_num = rpd.t_zone_position_num;
                    rpde.t_zone_result = rpd.t_zone_result;

                    //SKIN TYPE U존 영역 Check
                    tb_skintype_u_result.Text = string.Format("U ZONE : {0}", rpd.u_zone_result);

                    ToolTip uc_uzone_tooltip = new ToolTip();
                    uc_uzone_tooltip.Background = Brushes.Transparent;
                    uc_uzone_tooltip.BorderBrush = Brushes.Transparent;
                    uc_uzone_tooltip.Content = new UC_Result_T_U_Zone_Tooltip(rpd.u_zone_subun, rpd.u_zone_ubun);
                    
                    switch (rpd.u_zone_position_num)
                    {
                        case 1: uzone_check1_1.Visibility = Visibility.Visible; uzone_check1_1.ToolTip = uc_uzone_tooltip; break;
                        case 2: uzone_check2_1.Visibility = Visibility.Visible; uzone_check2_1.ToolTip = uc_uzone_tooltip; break;
                        case 3: uzone_check3_1.Visibility = Visibility.Visible; uzone_check3_1.ToolTip = uc_uzone_tooltip; break;
                        case 4: uzone_check1_2.Visibility = Visibility.Visible; uzone_check1_2.ToolTip = uc_uzone_tooltip; break;
                        case 5: uzone_check2_2.Visibility = Visibility.Visible; uzone_check2_2.ToolTip = uc_uzone_tooltip; break;
                        case 6: uzone_check3_2.Visibility = Visibility.Visible; uzone_check3_2.ToolTip = uc_uzone_tooltip; break;
                        case 7: uzone_check1_3.Visibility = Visibility.Visible; uzone_check1_3.ToolTip = uc_uzone_tooltip; break;
                        case 8: uzone_check2_3.Visibility = Visibility.Visible; uzone_check2_3.ToolTip = uc_uzone_tooltip; break;
                        case 9: uzone_check3_3.Visibility = Visibility.Visible; uzone_check3_3.ToolTip = uc_uzone_tooltip; break;
                    }
                    rpde.u_zone_position_num = rpd.u_zone_position_num;
                    rpde.u_zone_result = rpd.u_zone_result;

                    //Fitzpatrick's Skin Type 영역 Check
                    //switch (rpd.fizpatrick_color_point)
                    //{
                    //    case 1: fitz_1.Visibility = Visibility.Visible; break;
                    //    case 2: fitz_2.Visibility = Visibility.Visible; break;
                    //    case 3: fitz_3.Visibility = Visibility.Visible; break;
                    //    case 4: fitz_4.Visibility = Visibility.Visible; break;
                    //    case 5: fitz_5.Visibility = Visibility.Visible; break;
                    //    case 6: fitz_6.Visibility = Visibility.Visible; break;
                    //}
                    //rpde.fizpatrick_color_point = rpd.fizpatrick_color_point;

                    //Solution Type
                    tb_solution_type_number.Text = rpd.solution_type_number;
                    tb_solution_type_result.Text = rpd.solution_type_result;

                    rpde.solution_type_number = rpd.solution_type_number;
                    rpde.solution_type_result = rpd.solution_type_result;
                    rpde.solution_type_beautytips = rpd.solution_type_beautytips;

                    //Sensitive Type
                    tb_SensitiveType_No.Text = rpd.sensitive_type_number.ToString();
                    tb_SensitiveType_result.Text = rpd.sensitive_type_result.ToString();

                    rpde.sensitive_type_number = rpd.sensitive_type_number.ToString();
                    rpde.sensitive_type_result = rpd.sensitive_type_result.ToString();

                    if (rpd.specialtip_img != null && rpd.specialtip_img.Length > 0)
                        rpde.specialtip_img = rpd.specialtip_img;

                    if (rpd.specialtip_memo != null && rpd.specialtip_memo.Length > 0)
                        rpde.specialtip_memo = rpd.specialtip_memo;

                    UpdateInkCanvasBindArea();
                }
                else
                {
                    //Common.CommonMessageBox.ShowAlertMessage("선택된 사용자가 없습니다.\n사용자를 선택 후 진행하여 주십시오.");
                }
            }
                catch (Exception ex)
            {
                Common.CommonMessageBox.ShowErrorMessage(Common.CommonBiz.CommonErrorMessage);
                Common.CommonBiz.LogRecord($"{LoginSession.SelectedMember.name}님 측정 시 결과페이지 에러 내용: {ex.Message}");
                Common.CommonBiz.ErrorLogWrite(this.GetType().FullName, ex.Message);

            }
        }

        private int GetConvertConsernValue(string centerText)
        {
            int result = 0;

            switch (centerText)
            {
                case "집중\r\n관리":
                    result = 1;
                    break;
                case "관심\r\n필요":
                    result = 2;
                    break;
                case "보통":
                    result = 3;
                    break;
                case "좋음":
                    result = 4;
                    break;
                case "매우\r\n좋음":
                    result = 5;
                    break;
            }
            return result;
        }

        private void Grid_inkarea_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            InkCanvasOpen();
        }

        public void UpdateInkCanvasBindArea()
        {
            if (rpd != null && rpd.specialtip_img != null && rpd.specialtip_img.Length > 0)
            {
                grid_inkarea.Visibility = System.Windows.Visibility.Collapsed;
                grid_stoke.Visibility = System.Windows.Visibility.Visible;
                img_stoke.Source = CommonBiz.ConvertBytesToBitmap(rpd.specialtip_img);
            }
            else
            {
                grid_inkarea.Visibility = System.Windows.Visibility.Visible;
                grid_stoke.Visibility = System.Windows.Visibility.Collapsed;
            }
        }      
    }

    public class ResultPage_Data
    {
        public byte[] specialtip_img = new byte[0];
        public byte[] specialtip_stoke_img = new byte[0];
        public string specialtip_memo = string.Empty;

        //피부점수
        public double skin_score { get; set; }
        //피부고민2개
        public string skin_gomin { get; set; }
        //SKIN CONCERN
        public List<UC_Result_EllipseText> list_Concern;
        //SKIN TYPE

        public bool IsComplexity { get; set; }

        //T ZONE
        public string t_zone_result { get; set; }
        public int t_zone_position_num { get; set; }

        public double t_zone_subun { get; set; }
        public double t_zone_ubun { get; set; }

        //U ZONE
        public string u_zone_result { get; set; }
        public int u_zone_position_num { get; set; }
        public double u_zone_subun { get; set; }
        public double u_zone_ubun { get; set; }
        //Fizpatrick's Skin type 
        /// <summary>
        /// 1~6 단계 낮을수록밝음
        /// </summary>
        public int fizpatrick_color_point { get; set; }
        //SOULUTION TYPE NO.
        /// <summary>
        /// 1~19
        /// </summary>
        public string solution_type_number { get; set; }
        public string solution_type_result { get; set; }
        public string solution_type_beautytips { get; set; }
        //SENSITIVE TYPE NO

        public enum Sensitive_Type { S0, S1, S2, S3, S4};

        public Sensitive_Type sensitive_type_number { get; set; }
        public string sensitive_type_result { get; set; }
        public C_Survey survey { get; set; }

        //SPECIAL TIP

        //avr_score_data
        Dictionary<string, double> list_avr_score_data;

        Result_Logic rl = new Result_Logic();

        //string[] str_list = { "모공", "주름", "미래주름", "색소침착", "멜라닌", "다크서클", "붉은기", "포피린", "탄력" };
        string[] str_list = { "모공", "주름", "미래주름", "색소침착", "멜라닌", "붉은기", "포피린", "탄력", "경피수분손실도" };

        public ResultPage_Data(ResultMarkVu markvu, Member member , C_Survey _survey)
        {
            survey = _survey;

            list_avr_score_data = new Dictionary<string, double>();

            SetSkinScore(markvu, member.course_flg);

            SetSkinGomin(markvu, member.course_flg);

            SetIsComplexity(markvu);

            SetSKinConcern(markvu, member);
            
            SetT_U_Zone(markvu);

            SetFitzpatrickSkin(markvu);

            SetSolutionType(markvu);

            SetSensitiveType(survey);
        }

        private void SetSolutionType(ResultMarkVu markvu)
        {
            solution_type_number = rl.GetSolutionTypeNumber(t_zone_result, u_zone_result, list_Concern, survey);

            solution_type_result = rl.GetSolution_Result(solution_type_number);

            solution_type_beautytips = rl.GetSolution_Beautytips(solution_type_number);
        }

        private void SetSensitiveType(C_Survey survey)
        {
            //고민점수 로직
            //sensitive_type_number
            //sensitive_type_result

            double total_survey_point = 0;
            if (survey.S4_1 == null)
            {
                total_survey_point = 5;
            }
            else if (survey.S4_1.Equals(""))
            {
                total_survey_point = 5;
            }
            else
            {
                total_survey_point =
                    +GetConvertStoD(survey.S4_1)
                    + GetConvertStoD(survey.S4_2)
                    + GetConvertStoD(survey.S4_3)
                    + GetConvertStoD(survey.S4_4)
                    + GetConvertStoD(survey.S4_5)
                    + GetConvertStoD(survey.S4_6);
            }
            if (0 < total_survey_point && total_survey_point <= 3) // SENSITIVE_TYPE 문진점수가 0 보다 크고 3보다 작을경우 : S0
            {
                sensitive_type_number = Sensitive_Type.S0;
            }
            else if (4 <= total_survey_point && total_survey_point <= 10) // SENSITIVE_TYPE 문진점수가 4 보다 크고 10 보다 작을경우 : S1
            {
                sensitive_type_number = Sensitive_Type.S1;
            }
            else if (11 <= total_survey_point && total_survey_point <= 16) // SENSITIVE_TYPE 문진점수가 11 보다 크고 16 보다 작을경우 : S2 OR S3
            {
                if (
                    (GetConvertStoD(survey.S2_3) + GetConvertStoD(survey.S2_4)) >= (GetConvertStoD(survey.S2_1) + GetConvertStoD(survey.S2_2))
                )
                {
                    sensitive_type_number = Sensitive_Type.S2;
                }

                if (
                    (GetConvertStoD(survey.S2_1) + GetConvertStoD(survey.S2_2)) > ( GetConvertStoD(survey.S2_3) + GetConvertStoD(survey.S2_4) )
                )
                {
                    sensitive_type_number = Sensitive_Type.S3;
                }
            }
            else if (
                (12 <= (GetConvertStoD(survey.S4_1)
                + GetConvertStoD(survey.S4_2)
                + GetConvertStoD(survey.S4_3)
                + GetConvertStoD(survey.S4_4)))

                &&

                (6 <= (GetConvertStoD(survey.S4_5)
                + GetConvertStoD(survey.S4_6)))

                )
            {
                sensitive_type_number = Sensitive_Type.S4;
            }
            else
            {
                sensitive_type_number = Sensitive_Type.S4;
            }
            
            sensitive_type_result = rl.GetSensitiveTypeResult(sensitive_type_number.ToString());
        }

        private double GetConvertStoD(string value)
        {
            return Convert.ToDouble(value);
        }

        private void SetIsComplexity(ResultMarkVu markvu)
        {
            //복합성 여부
            if (t_zone_position_num == 3 && u_zone_position_num == 1) { IsComplexity = true; }
            else if (t_zone_position_num == 3 && u_zone_position_num == 4 || u_zone_position_num == 7) { IsComplexity = true; }
            else if (t_zone_position_num == 2 && u_zone_position_num == 1) { IsComplexity = true; }
            else if (t_zone_position_num == 2 && u_zone_position_num == 4 || u_zone_position_num == 7) { IsComplexity = true; }
            else if (t_zone_position_num == 6 || t_zone_position_num == 9 && u_zone_position_num == 1) { IsComplexity = true; }
            else if (t_zone_position_num == 6 || t_zone_position_num == 9 && u_zone_position_num == 4 || u_zone_position_num == 7) { IsComplexity = true; }
            else if (t_zone_position_num == 1 && u_zone_position_num == 2) { IsComplexity = true; }
            else if (t_zone_position_num == 1 && u_zone_position_num == 3) { IsComplexity = true; }
            else if (t_zone_position_num == 1 && u_zone_position_num == 6 || u_zone_position_num == 9) { IsComplexity = true; }
            else if (t_zone_position_num == 4 || t_zone_position_num == 7 && u_zone_position_num == 2) { IsComplexity = true; }
            else if (t_zone_position_num == 4 || t_zone_position_num == 7 && u_zone_position_num == 3) { IsComplexity = true; }
            else if (t_zone_position_num == 4 || t_zone_position_num == 7 && u_zone_position_num == 6 || u_zone_position_num == 9) { IsComplexity = true; }
            else IsComplexity = false;
        }

        private void SetFitzpatrickSkin(ResultMarkVu markvu)
        {
            //1~6단계

            double FSkinColor_Avg = (markvu.FSkinColor_A + markvu.FSkinColor_B + markvu.FSkinColor_E + markvu.FSkinColor_F + markvu.FSkinColor_G + markvu.FSkinColor_H) / 5;

            if( FSkinColor_Avg >= 85 ) { fizpatrick_color_point = 6; }
            else if (FSkinColor_Avg >= 75 && FSkinColor_Avg < 85) { fizpatrick_color_point = 5; }
            else if (FSkinColor_Avg >= 65 && FSkinColor_Avg < 75) { fizpatrick_color_point = 4; }
            else if (FSkinColor_Avg >= 55 && FSkinColor_Avg < 65) { fizpatrick_color_point = 3; }
            else if (FSkinColor_Avg >= 40 && FSkinColor_Avg < 55) { fizpatrick_color_point = 2; }
            else if (FSkinColor_Avg < 40 ) { fizpatrick_color_point = 1; }
        }

        private void SetT_U_Zone(ResultMarkVu markvu)
        {
            //T존
            double tzone_subun_value = markvu.FSubun_A;
            double tzone_ubun_value = (markvu.FSebum_A + markvu.FSebum_B) / 2;
            //double tzone_ubun_value = (markvu.FSebum_A>= markvu.FSebum_B+10)? markvu.FSebum_A:(markvu.FSebum_A + markvu.FSebum_B) / 2;
            t_zone_subun = tzone_subun_value;
            t_zone_ubun = tzone_ubun_value;
            //U존
            double uzone_subun_value = (markvu.FSubun_G + markvu.FSubun_H) / 2;
            double uzone_ubun_value = (markvu.FSebum_G + markvu.FSebum_H) / 2;
            u_zone_subun = uzone_subun_value;
            u_zone_ubun = uzone_ubun_value;

            LoginSession.Result_SkinConcern_Rpt.tZone_Moisture = t_zone_subun;
            LoginSession.Result_SkinConcern_Rpt.tZone_Oilskin = t_zone_ubun;
            LoginSession.Result_SkinConcern_Rpt.uZone_Moisture = u_zone_subun;
            LoginSession.Result_SkinConcern_Rpt.uZone_Oilskin = u_zone_ubun;

            string tzone_subun_result = string.Empty;
            string tzone_ubun_result = string.Empty;
            //T존 수분위치
            if (tzone_subun_value < 20)
            {
                tzone_subun_result = "수분부족";
            }
            else if (20 <= tzone_subun_value && tzone_subun_value < 40)
            {
                tzone_subun_result = "수분적당";
            }
            else if (40 <= tzone_subun_value)
            {
                tzone_subun_result = "수분충분";
            }
            //T존 유분위치

            if (tzone_ubun_value < 9)
            {
                tzone_ubun_result = "유분부족";
            }
            else if (9 <= tzone_ubun_value && tzone_ubun_value < 19)

            {
                tzone_ubun_result = "유분적당";
            }
            else if (19 <= tzone_ubun_value)
            {
                tzone_ubun_result = "유분과다";
            }
            
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분과다") { t_zone_position_num = 1; t_zone_result = "수분부족 유분과다 지성"; }
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분적당") { t_zone_position_num = 2; t_zone_result = "수분 부족 건성"; }
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분부족") { t_zone_position_num = 3; t_zone_result = "유수분 부족 건성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분과다") { t_zone_position_num = 4; t_zone_result = "유분 과다 지성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분적당") { t_zone_position_num = 5; t_zone_result = "유수분 균형 중성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분부족") { t_zone_position_num = 6; t_zone_result = "유분 부족 건성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분과다") { t_zone_position_num = 7; t_zone_result = "유분 과다 지성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분적당") { t_zone_position_num = 8; t_zone_result = "유수분 균형 중성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분부족") { t_zone_position_num = 9; t_zone_result = "유분 부족 건성"; }
            
            string uzone_subun_result = string.Empty;
            string uzone_ubun_result = string.Empty;
            //U존 수분위치
            if (uzone_subun_value < 20)
            {
                uzone_subun_result = "수분부족";
            }
            else if (20 <= uzone_subun_value && uzone_subun_value < 40)
            {
                uzone_subun_result = "수분적당";
            }
            else if (40 <= uzone_subun_value)
            {
                uzone_subun_result = "수분충분";
            }
            //U존 유분위치
            if (uzone_ubun_value <= 5.5)
            {
                uzone_ubun_result = "유분부족";
            }
            else if (5.5 < uzone_ubun_value && uzone_ubun_value < 12 )
            {
                uzone_ubun_result = "유분적당";
            }
            else if (12 <= uzone_ubun_value)
            {
                uzone_ubun_result = "유분과다";
            }

            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분과다") {  u_zone_position_num = 1; u_zone_result = "수분부족 유분과다 지성"; }
            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분적당") {  u_zone_position_num = 2; u_zone_result = "수분 부족 건성"; }
            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분부족") {  u_zone_position_num = 3; u_zone_result = "유수분 부족 건성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분과다") {  u_zone_position_num = 4; u_zone_result = "유분 과다 지성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분적당") {  u_zone_position_num = 5; u_zone_result = "유수분 균형 중성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분부족") {  u_zone_position_num = 6; u_zone_result = "유분 부족 건성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분과다") {  u_zone_position_num = 7; u_zone_result = "유분 과다 지성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분적당") {  u_zone_position_num = 8; u_zone_result = "유수분 균형 중성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분부족") {  u_zone_position_num = 9; u_zone_result = "유분 부족 건성"; }

            
        }

        public void SetSkinScore(ResultMarkVu markvu, string course_flg)
        {
            //8개 구분
            

            double score = 0;

            foreach (string str_gubun in str_list)
            {
                if (str_gubun != "탄력")
                {
                    double avr_value = GetGubunByAverage(markvu, str_gubun);
                    score = rl.GetSkinConcernScore(LoginSession.SelectedMember.sex, LoginSession.SelectedMember.AgeReal, str_gubun, avr_value);
                    list_avr_score_data.Add(str_gubun, score);
                }
                else
                {
                    if (course_flg == "I")
                    {
                        double avr_value = GetGubunByAverage(markvu, str_gubun);
                        score = rl.GetSkinConcernScore(LoginSession.SelectedMember.sex, LoginSession.SelectedMember.AgeReal, str_gubun, avr_value);
                        list_avr_score_data.Add(str_gubun, score);
                    }
                }
            }
            //소수점 제거 

            Result_SkinConcern_Rpt rsr_list = new Result_SkinConcern_Rpt();

            rsr_list.pore = (Double.Parse(list_avr_score_data["모공"].ToString("N1")));
            rsr_list.wrinkle = (Double.Parse(list_avr_score_data["주름"].ToString("N1")));
            rsr_list.futurewrinkles = (Double.Parse(list_avr_score_data["미래주름"].ToString("N1")));
            rsr_list.pigmentation = (Double.Parse(list_avr_score_data["색소침착"].ToString("N1")));
            rsr_list.melanin = (Double.Parse(list_avr_score_data["멜라닌"].ToString("N1")));
            rsr_list.transdermal = (Double.Parse(list_avr_score_data["경피수분손실도"].ToString("N1")));
            rsr_list.redness = (Double.Parse(list_avr_score_data["붉은기"].ToString("N1")));
            rsr_list.porphyrin = (Double.Parse(list_avr_score_data["포피린"].ToString("N1")));
            rsr_list.elasticity = list_avr_score_data.Count == 9 ? (Double.Parse(list_avr_score_data["탄력"].ToString("N1"))) : 0;
            //rsr_list.tZone_Moisture = ;
            //rsr_list.tZone_Oilskin = ;
            //rsr_list.uZone_Moisture = ;
            //rsr_list.uZone_Oilskin = ;

            LoginSession.Result_SkinConcern_Rpt = rsr_list;

            skin_score = Math.Truncate(list_avr_score_data.Values.Average());

        }

        public void SetSkinGomin(ResultMarkVu markvu, string course_flg)
        {
            int cnt = 0;

            var items = from pair in list_avr_score_data
                        orderby pair.Value ascending
                        select pair;

            // Display results.
            foreach (KeyValuePair<string, double> pair in items)
            {
                if (cnt == 0)
                {
                    skin_gomin = pair.Key + ",";
                }
                else if (cnt == 1)
                {
                    skin_gomin += pair.Key;
                    break;
                }
                cnt++;
            }
        }

        private void SetSKinConcern(ResultMarkVu markvu, Member _member)
        {
            list_Concern = new List<UC_Result_EllipseText>();


            

            foreach (string str_gubun in str_list)
            {
                if (str_gubun != "탄력")
                {


                    list_Concern.Add(Create_UC_Result_EllipseText(markvu, str_gubun , _member));
                }
                else
                {
                    if (_member.course_flg == "I")
                    {
                        list_Concern.Add(Create_UC_Result_EllipseText(markvu, str_gubun, _member));
                    }
                }
            }
        }

        public UC_Result_EllipseText Create_UC_Result_EllipseText(ResultMarkVu markvu, string str_gubun, Member _member)
        {
            UC_Result_EllipseText result = new UC_Result_EllipseText();
            Console.WriteLine("dasdasdasda" + result);
            result.markvu_data = markvu;
            
            result.Background = Brushes.White;
            result.Margin = new Thickness(8);
            result.Title = str_gubun;
            result.age = _member.AgeReal;
            result.sex = _member.sex;
            result.UserKey = _member.userkey;
            result.SurveyKey = _member.surveyNo;
            result.UserName = _member.name;
            result.EllipseStroke = Brushes.Pink; 
            result.StrokeThickness = 0.5;

            if (str_gubun != "탄력" && str_gubun != "다크서클" && str_gubun != "경피수분손실도")
            {
                result.Cursor = Cursors.Hand;
                result.MouseLeftButtonDown += Result_MouseLeftButtonDown;
            }

            Result_Logic rl = new Result_Logic();

            IEnumerable<Result_Concern_Entity> _from_rce = rl.list_rce.Where(item => item.gender == _member.sex && item.gubun == str_gubun && item.age == rl.GetAgeArea(_member.AgeReal));
            if (_from_rce != null)
            {
                result.from_rce = _from_rce;
            }
            
            result.Tooltip_Score = rl.GetSkinConcernScore(LoginSession.SelectedMember.sex, LoginSession.SelectedMember.AgeReal, str_gubun, GetGubunByAverage(markvu, str_gubun));
            double grade_Score = GetGubunByAverage(markvu, str_gubun);
            if (str_gubun.Equals("탄력"))
            {
                if (result.Tooltip_Score >= 80)
                {
                    result.CenterText = "매우\r\n좋음";
                }
                else if (result.Tooltip_Score < 80 && result.Tooltip_Score > 60)
                {
                    result.CenterText = "좋음";
                }
                else if (result.Tooltip_Score <= 60 && result.Tooltip_Score > 40)
                {
                    result.CenterText = "보통";
                }
                else if (result.Tooltip_Score <= 40 && result.Tooltip_Score > 20)
                {
                    result.CenterText = "관심\r\n필요";
                }
                else
                {
                    result.CenterText = "집중\r\n관리";
                }
            }
            else
            {
                result.CenterText = rl.GetSkinConcernGrade(LoginSession.SelectedMember.sex, LoginSession.SelectedMember.AgeReal, str_gubun, grade_Score);
            }
            
             
            /*if (result.Tooltip_Score >= 80)
            {
                result.CenterText = "매우\r\n좋음";
            }
            else if (result.Tooltip_Score < 80 && result.Tooltip_Score >= 60)
            {
                result.CenterText = "좋음";
            }
            else if (result.Tooltip_Score < 60 && result.Tooltip_Score >= 40)
            {
                result.CenterText = "보통";
            }
            else if (result.Tooltip_Score < 40 && result.Tooltip_Score >= 20)
            {
                result.CenterText = "관심\r\n필요";
            }
            else
            {
                result.CenterText = "집중\r\n관리";
            }*/

            return result;
        }

        private void Result_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            UC_Result_EllipseText item = sender as UC_Result_EllipseText;

            if (item != null)
            {
                PopupConcernItem(item);
            }
        }

        private void PopupConcernItem(UC_Result_EllipseText _item)
        {
            Popup.Popup_ConcernItem pci = new Popup_ConcernItem(_item) { WindowStartupLocation = WindowStartupLocation.CenterScreen };
            pci.ShowDialog();
        }

        private double GetGubunByAverage(ResultMarkVu markvu , string gubun)
        {
            double result = 0;

            switch (gubun)
            {
                case "모공":
                    result = (markvu.FPore_A + markvu.FPore_B + markvu.FPore_G + markvu.FPore_H) / 4;
                    break;
                case "주름":
                    result = (markvu.FWrinkle_A + markvu.FWrinkle_C + markvu.FWrinkle_D + markvu.FWrinkle_E + markvu.FWrinkle_F) / 5;
                    break;
                case "미래주름":
                    result = (markvu.FFutureWrinkle_A + markvu.FFutureWrinkle_E + markvu.FFutureWrinkle_F + markvu.FFutureWrinkle_G + markvu.FFutureWrinkle_H) / 5;
                    break;
                case "색소침착":
                    result = (markvu.FPigmentation_A + markvu.FPigmentation_B + markvu.FPigmentation_E + markvu.FPigmentation_F + markvu.FPigmentation_G + markvu.FPigmentation_H) / 6;
                    break;
                case "멜라닌":
                    if(markvu.Sex.Equals("M"))
                        result = (markvu.FMelanin_A + markvu.FMelanin_B + markvu.FMelanin_E + markvu.FMelanin_F + markvu.FMelanin_G + markvu.FMelanin_H) / 6;
                    else
                        result = (markvu.FMelanin_A + markvu.FMelanin_G + markvu.FMelanin_H) / 3;
                    break;
                case "붉은기":
                    result = (markvu.FRedness_A + markvu.FRedness_B + markvu.FRedness_E + markvu.FRedness_F + markvu.FRedness_G + markvu.FRedness_H) / 6;
                    break;
                case "포피린":
                    result = (markvu.FPorphyrin_A + markvu.FPorphyrin_B + markvu.FPorphyrin_G + markvu.FPorphyrin_H) / 4;
                    break;
                //case "다크서클":
                //    if (((markvu.FSkinColor_E + markvu.FSkinColor_F) / 2) - ((markvu.FSkinColor_G + markvu.FSkinColor_H) / 2) < 0)
                //    {
                //        result = 0;
                //    }
                //    else
                //    {
                //        result = ((markvu.FSkinColor_E + markvu.FSkinColor_F) / 2) - ((markvu.FSkinColor_G + markvu.FSkinColor_H) / 2);
                //    }
                //    //눈밑 피부톤 평균값 - 양볼 피부톤 평균값< 0 일 경우 다크서클 '매우 좋음'
                //    //눈밑 피부톤 평균값 - 양볼 피부톤 평균값≥0 일 경우 위 로직에 따라 5 level 및 점수 산정
                //    break;
                case "경피수분손실도":
                    if (LoginSession.SelectedM_Vapometer != null)
                    {
                        result = Convert.ToDouble((Convert.ToDouble(LoginSession.SelectedM_Vapometer.C_Left) + Convert.ToDouble(LoginSession.SelectedM_Vapometer.C_Right)) / 2);
                    }
                    else
                    {           
                        result = -1;
                    }
                    break;
                case "탄력":
                    if (LoginSession.SelectedM_CNK_Customer != null)
                    {

                        result = Convert.ToDouble(LoginSession.SelectedM_CNK_Customer.cheek);
                    }
                    else
                    {
                        //측정을 안했을경우 강나나님이 보통으로 표기 요청
                        result = -1;
                    }
                    //탄력값
                    break;
            }

            return result;
        }

        public void SetCustomSolutionType(string text, string isUpDown)
        {
            if (isUpDown == "UP")
            {
                switch (text)
                {
                    case "1": SetSolutionChange("2"); break;
                    case "2": SetSolutionChange("3"); break;
                    case "3": SetSolutionChange("4"); break;
                    case "4": SetSolutionChange("5"); break;
                    case "5": SetSolutionChange("6"); break;
                    case "6": SetSolutionChange("7"); break;
                    case "7": SetSolutionChange("8"); break;
                    case "8": SetSolutionChange("9"); break;
                    case "9": SetSolutionChange("10"); break;
                    case "10": SetSolutionChange("11"); break;
                    case "11": SetSolutionChange("12"); break;
                    case "12": SetSolutionChange("13"); break;
                    case "13": SetSolutionChange("14"); break;
                    case "14": SetSolutionChange("15"); break;
                    case "15": SetSolutionChange("16"); break;
                    case "16": SetSolutionChange("17"); break;
                    case "17": SetSolutionChange("18"); break;
                    case "18": SetSolutionChange("19"); break;
                    case "19": SetSolutionChange("1"); break;
                    default: SetSolutionChange("1"); break;
                }
            }
            else
            {
                switch (text)
                {
                    case "1": SetSolutionChange("19"); break;
                    case "2": SetSolutionChange("1"); break;
                    case "3": SetSolutionChange("2"); break;
                    case "4": SetSolutionChange("3"); break;
                    case "5": SetSolutionChange("4"); break;
                    case "6": SetSolutionChange("5"); break;
                    case "7": SetSolutionChange("6"); break;
                    case "8": SetSolutionChange("7"); break;
                    case "9": SetSolutionChange("8"); break;
                    case "10": SetSolutionChange("9"); break;
                    case "11": SetSolutionChange("10"); break;
                    case "12": SetSolutionChange("11"); break;
                    case "13": SetSolutionChange("12"); break;
                    case "14": SetSolutionChange("13"); break;
                    case "15": SetSolutionChange("14"); break;
                    case "16": SetSolutionChange("15"); break;
                    case "17": SetSolutionChange("16"); break;
                    case "18": SetSolutionChange("17"); break;
                    case "19": SetSolutionChange("18"); break;
                    default: SetSolutionChange("19"); break;
                }
            }
        }

        private void SetSolutionChange(string solution_number)
        {
            solution_type_number = solution_number;
            solution_type_result = rl.GetSolution_Result(solution_number);
            solution_type_beautytips = rl.GetSolution_Beautytips(solution_number);
        }
    }
}