$(function () {
  $("table.datatable").DataTable({
    paging: true,
    pageLength: 10,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    bDestroy: true,
  });
  $("#summernote").summernote({
    height: 600,
    focus: true,
  });
});
