import ReactPaginate from 'react-paginate';
import './pagination.css';


export default function PaginatedItems({itemsPerPage,setPage,total}) {
  const pageCount=total/itemsPerPage;  
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        nextLinkClassName="text-decoration-none fw-bold text-primary"
        onPageChange={(e)=>setPage(e.selected +1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        previousLinkClassName="text-decoration-none fw-bold text-primary"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-center flex-wrap  rounded shadow-sm"
        pageLinkClassName="pagination-link-anchor text-dark  mx-2"
        activeLinkClassName="bg-dark text-white"
      />
    </>
  );
}

