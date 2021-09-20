import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntities } from "../entities/students/student.reducer";
import { IRootState } from "../shared/reducers";
import Button from "./Button";

const TablePagination = () => {

    const current = useSelector((root: IRootState) => root.student?.links.current) ?? 1;
    const last = useSelector((root: IRootState) => root.student?.links.last) ?? 1;

    const dispatch = useDispatch();

    const goToPage = (page: number) => () => {
        page !== current && dispatch(getEntities(page))
    }

    const pages = (total: number) => {
        // eslint-disable-next-line array-callback-return
        const t = new Array(total).fill(1).map((v, i) => i + 1)
        return t;
    }

    return (
        <div className="table-pagination">
            <Button color="light" onClick={goToPage(current - 1)} disabled={current === 1}>Previous</Button>
            {last && pages(last).map(v => (
                <Button color="light" key={v} onClick={goToPage(v)} className={current === v ? 'active' : ''}>{v}</Button>
            ))}
            <Button color="light" onClick={goToPage(current + 1)} disabled={current === last}>Next</Button>
        </div>
    )
}

export default TablePagination;