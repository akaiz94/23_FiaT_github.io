var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}
$(document).ready(function () {

    console.log('analysis_result page start -> ')
});


public double GetSkinConcernScore(string _gender, int _age, string _gubun, double _value)
        {           
            double result = 0;

            int age_area = GetAgeArea(_age);

            IEnumerable<Result_Concern_Entity> from_rce = list_rce.Where(item => item.gender == _gender && item.gubun == _gubun && item.age == age_area);

            if (_gubun == "탄력" && _value == -1)
            {
                result = 50;
                //result = -1;
            }
            else if (_gubun == "탄력" && _value > -1)
            {
                foreach (Result_Concern_Entity rce in from_rce)
                {

                    double 총범위;
                    double 특정값;
                    result = 100;

                    if (_value >= rce.sixth)
                    {
                        총범위 = rce.sixth - rce.fifth;
                        특정값 = _value - rce.fifth;
                        result -= (특정값 / 총범위 * 20 + 80);
                    }
                    else
                    {
                        result = -1;
                    }
                }
            }else if (_gubun == "경피수분손실도" && _value == -1)
            {
                result = 50;
            }
            else
            {
                foreach (Result_Concern_Entity rce in from_rce)
                {

                    double 총범위;
                    double 특정값;
                    result = 100;
                    if (_value >= rce.fifth)
                    {
                        총범위 = rce.sixth - rce.fifth;
                        특정값 = _value - rce.fifth;
                        result -= (특정값 / 총범위 * 20 + 80);
                    }
                    else if (_value >= rce.fourth)
                    {
                        총범위 = rce.fifth - rce.fourth;
                        특정값 = _value - rce.fourth;
                        result -= (특정값 / 총범위 * 20 + 60);
                    }
                    else if (_value >= rce.third)
                    {
                        총범위 = rce.fourth - rce.third;
                        특정값 = _value - rce.third;
                        result -= (특정값 / 총범위 * 20 + 40);
                    }
                    else if (_value >= rce.second)
                    {
                        총범위 = rce.third - rce.second;
                        특정값 = _value - rce.second;
                        result -= (특정값 / 총범위 * 20 + 20);
                    }
                    else if (_value >= rce.first)
                    {
                        총범위 = rce.second - rce.first;
                        특정값 = _value - rce.first;
                        result -= (특정값 / 총범위 * 20);
                    }

                }
            }

            if (result > 100)
            {
                return 100;
            }
            else if (result < 0)
            {
                return 0;
            }

            return result;
        }