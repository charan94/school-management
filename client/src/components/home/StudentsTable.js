import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SMColumn from '../shared/SMColumn';
import * as moment from 'moment';
import SMLoader from '../shared/SMLoader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AddCourseModal from './AddCourseModal';

const StudentsTable = (props) => {
    const { data, loading, onPage, onFilter, onSort, paginationProps, onRowExpand, expandedRows, onRowCollapse, state, searchCourses, updateStudent } = props;
    let dt = null;

    const [showCourseDialog, setShowCourseDialog] = useState(false);

    const addCourse = () => {
        searchCourses();
        setShowCourseDialog(true);
    }

    const onCourseDialogHide = () => {
        setShowCourseDialog(false);
    }

    const rowExpansionTemplate = (data) => {
        if (!state.expandedStudent) {
            return <SMLoader />
        }
        return (
            <Row>
                <Col xs={12} md={6}>
                    <h6>Registered Courses</h6>
                </Col>
                <Col xs={12} md={6}>
                    <Button type="button" variant={'primary'} className="float-right" onClick={addCourse}>Add Course</Button>
                </Col>
                <Col xs={12} md={{ offset: 2, span: 6 }} className="mt-2">
                    <div className="datatable-responsive shadow">
                        <DataTable
                            value={state.expandedStudent?.course || []}
                            className="p-datatable-responsive table table-hover"
                            rows={10}
                            sortField={'name'}
                            dataKey="courseUUID"
                            sortOrder={paginationProps?.sortOrder || 0}
                        >
                            <Column field="name" header="Course Name" body={(rowData) => <SMColumn name="Course Name" value={rowData?.name} />} sortable />
                            <Column field="description" header="Description" body={(rowData) => <SMColumn name="Description" value={rowData?.description} />} />
                        </DataTable>
                    </div>
                </Col>
                <AddCourseModal
                    state={state}
                    showCourseDialog={showCourseDialog}
                    onHide={onCourseDialogHide}
                    searchCourses={searchCourses}
                    updateStudent={updateStudent}
                    data={data}
                />
            </Row>
        );
    }

    return (
        <div className="datatable-responsive shadow-lg">
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
                sortField={paginationProps?.sortField || ''}
                sortOrder={paginationProps?.sortOrder || 0}
                className="p-datatable-responsive table"
                dataKey="studentUUID"
                rowExpansionTemplate={rowExpansionTemplate}
                onRowExpand={onRowExpand}
                expandedRows={expandedRows}
                onRowCollapse={onRowCollapse}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column expander style={{ width: '4em' }} />
                <Column field="firstName" header="First Name" body={(rowData) => <SMColumn name="First Name" value={rowData?.firstName} />} sortable filter filterPlaceholder="Search by First Name" />
                <Column field="lastName" header="Last Name" body={(rowData) => <SMColumn name="Last Name" value={rowData?.lastName} />} sortable filter filterPlaceholder="Search by Last Name" />
                <Column field="dob" header="Date of Birth" body={(rowData) => <SMColumn name="Date Of Birth" value={moment(rowData?.dob).format('yyyy-MM-DD')} />} />
                <Column field="mobile" header="Mobile" body={(rowData) => <SMColumn name="Mobile" value={rowData?.mobile} />} />
                <Column field="phone" header="Phone" body={(rowData) => <SMColumn name="Phone" value={rowData?.phone} />} />
                <Column field="created" header="Created Date" body={(rowData) => <SMColumn name="Created Date" value={moment(rowData?.created).format('yyyy-MM-DD')} />} sortable />
            </DataTable>
        </div>
    );
}

export default StudentsTable;