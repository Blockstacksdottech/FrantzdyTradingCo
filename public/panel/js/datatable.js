$(document).ready(function () {
  $("table.datatable").DataTable({
    retrieve: true,
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    pageLength: 5,
    order: [1, "desc"],
    lengthMenu: [
      [5, 10, 25, 50, 100, -1],
      [5, 10, 25, 50, 100, "All"],
    ],
  });
  $("#summernote").summernote({
    height: 600,
    focus: true,
  });
});
