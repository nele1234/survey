function getSurvey($scope, $http, toastr) {

var getting = function(){
    $http.get("/anketa")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
}
getting();

$scope.addAnketa = function () {
    console.log('anekta dodana')
    $http.post('/anketa', $scope.anketa).then(function (response) {
      console.log(response)
      /*$scope.tour.tourName = ''
      $scope.tour.tourCity = ''
      $scope.tour.tourDescription = ''
      $scope.tour.tourImage = ''*/
      //toastr.success("Tour added successfully")
      toastr.success("anketa dodana");
      getting()
    })
  }

  $scope.open = function () {
    $scope.visible = false;
    $scope.visible = $scope.visible = true;
  }
  $scope.close = function () {
    $scope.visible = true;
    $scope.visible = $scope.visible = false;
  }
};