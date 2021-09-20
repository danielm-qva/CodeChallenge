import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../shared/reducers";

const TableCount = () => {

    const show = useSelector((root: IRootState) => root.student?.entities.length)
    const total = useSelector((root: IRootState) => root.student?.totalItems) || 0

    return (
        <div className="table-count">
            <span>Showing <span className="emphasis">{show}</span> out of <span className="emphasis">{total}</span> entries</span>
        </div>
    )
}

export default TableCount;