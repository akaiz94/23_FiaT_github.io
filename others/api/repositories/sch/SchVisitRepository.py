from typing import List, Optional

from fastapi import Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from configs.Database import (
    get_db_connection,
)
from models.sch.SchVisitModel import SchVisit
from schemas.pydantic.sch.SchVisitSchema import SchVisitResponseSchema, SchMergedRequestSchema


class SchVisitRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def list(
            self,
            visitkey: Optional[int],
            m_userkey: Optional[int],
            m_surveyno: Optional[int],
            cstmid: Optional[str],
            ucstmid: Optional[int],
            limit: Optional[int],
            start: Optional[int],
    ) -> List[SchVisit]:
        query = self.db.query(SchVisit)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)
        if m_userkey:
            query = query.filter_by(m_userkey=m_userkey)
        if m_surveyno:
            query = query.filter_by(m_surveyno=m_surveyno)
        if cstmid:
            query = query.filter_by(cstmid=cstmid)
        if ucstmid:
            query = query.filter_by(ucstmid=ucstmid)

        query = query.order_by(SchVisit.visitkey.desc())
        return query.offset(start).limit(limit).all()

    def count(
            self,
            visitkey: Optional[int],
            m_userkey: Optional[int],
            m_surveyno: Optional[int],
            cstmid: Optional[str],
            ucstmid: Optional[int],
    ) -> int:
        query = self.db.query(SchVisit)

        if visitkey:
            query = query.filter_by(visitkey=visitkey)
        if m_userkey:
            query = query.filter_by(m_userkey=m_userkey)
        if m_surveyno:
            query = query.filter_by(m_surveyno=m_surveyno)
        if cstmid:
            query = query.filter_by(cstmid=cstmid)
        if ucstmid:
            query = query.filter_by(ucstmid=ucstmid)

        return query.count()

    def get(self, sch_visit: SchVisit) -> SchVisit:
        return self.db.get(
            SchVisit, (sch_visit.visitkey, sch_visit.skey)
        )

    def get_merged_sch_list(
            self,
            visitkey: int = None,
            skey: int = None,
            surveyno: int = None,
            name: str = None,
            phone: str = None,
            rsvn_date: str = None,
            pageSize: int = 10,
            startIndex: int = 0,
    ) -> List[SchVisitResponseSchema]:
        query_parameters = {"pageSize": pageSize, "startIndex": startIndex}  # 쿼리 매개변수를 미리 선언
        query_string = """
            SELECT *
            FROM (
                select ROW_NUMBER() OVER (ORDER BY rsvn_date DESC) AS RowNum, * from (
                    select
                        visitkey,skey,reg_date,rsvn_date,rsvn_time,name,course_flg,phone,sex,birthdate,birthdatetp,cstmid,ucstmid,m_userkey ,m_surveyNo ,
                           progress_flg,vst_path,vst_txt,create_dt,update_dt,email,comment,prog_cd as ProgramCode, cancelYN,phone_consulting
                    from tb_C_VisitSch A
                    union all
                    select
                         0 as visitkey,skey,reg_date,rsvn_date,rsvn_time,name,course_flg,phone,sex,birthdate,birthdatetp,cstmid,ucstmid,userkey as m_userkey,surveyNo as m_surveyNo,
                           progress_flg,vst_path,vst_txt,create_dt,update_dt,email,comment,ProgramCode,  '0' as cancelYN, phone_consulting
                    from tbVisitDirect B
                ) A2
                WHERE 1=1 
        """

        # 조건이 있으면 동적으로 쿼리에 추가
        if visitkey:
            query_string += f" and A2.visitkey = :visitkey"
            query_parameters["visitkey"] = visitkey
        if skey:
            query_string += f" and A2.skey = :skey"
            query_parameters["skey"] = skey
        if surveyno:
            query_string += f" and A2.m_surveyNo = :surveyno"
            query_parameters["surveyno"] = surveyno
        if name:
            query_string += f" and A2.name = :name"
            query_parameters["name"] = name
        if phone:
            query_string += f" and A2.phone = :phone"
            query_parameters["phone"] = phone
        if rsvn_date:
            query_string += f" and CAST(A2.rsvn_date  AS DATE) = :rsvn_date"
            query_parameters["rsvn_date"] = rsvn_date

        query_string += """
            ) AS PagedResults
            WHERE RowNum BETWEEN :startIndex + 1 AND :startIndex + :pageSize
        """

        # 쿼리 실행
        query = self.db.execute(text(query_string), query_parameters)
        results = query.fetchall()
        return results

    def get_merged_sch_list_count(
            self,
            visitkey: int = None,
            skey: int = None,
            surveyno: int = None,
            name: str = None,
            phone: str = None,
            rsvn_date: str = None,
            
    ) -> int:
        # Start with the base query
        query = """
            select count(visitkey) as cnt from (
                select
                    visitkey,skey,reg_date,rsvn_date,rsvn_time,name,course_flg,phone,sex,birthdate,birthdatetp,cstmid,ucstmid,m_userkey ,m_surveyNo ,
                       progress_flg,vst_path,vst_txt,create_dt,update_dt,email,comment,ProgramCode,cancelYN
                from tb_C_VisitSch A
                union all
                select
                     0 as visitkey,skey,reg_date,rsvn_date,rsvn_time,name,course_flg,phone,sex,birthdate,birthdatetp,cstmid,ucstmid,userkey as m_userkey,surveyNo as m_surveyNo,
                       progress_flg,vst_path,vst_txt,create_dt,update_dt,email,comment,ProgramCode, '0' as cancelYN
                from tbVisitDirect B
            ) A2
            where 1=1 
        """
        # Create a dictionary to hold parameters
        params = {}

        # Dynamically add WHERE clauses and parameters
        if visitkey:
            query += " and A2.visitkey = :visitkey"
            params['visitkey'] = visitkey
        if skey:
            query += " and A2.skey = :skey"
            params['skey'] = skey
        if surveyno:
            query += " and A2.m_surveyNo = :surveyno"
            params['surveyno'] = surveyno
        if name:
            query += " and A2.name = :name"
            params['name'] = name
        if phone:
            query += " and A2.phone = :phone"
            params['phone'] = phone
        if rsvn_date:
            query += " and CAST(A2.rsvn_date  AS DATE) = :rsvn_date"
            params['rsvn_date'] = rsvn_date

        result = self.db.execute(text(query), params).fetchone()

        return result[0] if result else 0

    def create(self, sch_visit: SchVisit) -> SchVisit:
        self.db.add(sch_visit)
        self.db.commit()
        self.db.refresh(sch_visit)
        return sch_visit

    def update(self, sch_visit: SchVisit) -> SchVisit:
        self.db.merge(sch_visit)
        self.db.commit()
        return sch_visit

    def delete(self, sch_visit: SchVisit) -> None:
        self.db.delete(sch_visit)
        self.db.commit()
        self.db.flush()
