(function(angular) {
  angular
    .module("ProgrammesListApp")
    .filter("imageUrl", Filter)
  ;

  Filter.$inject = [];

  function Filter() {
    function filter(url, size) {
      return url.replace("{recipe}", size);
    }

    return filter;
  }
})(angular);