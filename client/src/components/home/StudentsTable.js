import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SMColumn from '../shared/SMColumn';

const StudentsTable = (props) => {
    const { data, loading, onPage, onFilter, onSort } = props;
    let dt = null;

    return (
        <div className="datatable-responsive">
            <DataTable
                ref={(el) => dt = el}
                value={data.records}
                lazy
                paginator
                loading={loading}
                first={data.skip}
                rows={10}
                totalRecords={data.totalRecords}
                onPage={onPage}
                onFilter={onFilter}
                onSort={onSort}
            >
                <Column field="firstName" body={(rowData) => <SMColumn name="First Name" value={rowData?.firstName} />} sortable filter filterPlaceholder="Search by First Name" />
                <Column field="lastName" body={(rowData) => <SMColumn name="Last Name" value={rowData?.lastName} />} sortable filter filterPlaceholder="Search by Last Name" />
                <Column field="dob" body={(rowData) => <SMColumn name="Date Of Birth" value={rowData?.dob} />} />
                <Column field="mobile" body={(rowData) => <SMColumn name="Mobile" value={rowData?.mobile} />} />
                <Column field="phone" body={(rowData) => <SMColumn name="Phone" value={rowData?.phone} />} />
                <Column field="created" body={(rowData) => <SMColumn name="Created Date" value={rowData?.created} />} sortable />
            </DataTable>
        </div>
    );
}

export default StudentsTable;