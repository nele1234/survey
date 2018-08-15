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

  $scope.deleteSurvey = function (id) {
    console.log('delete surveS')
    console.log(id)
    $http.delete('/deleteSurvey/' + id).then(function (response) {
      console.log('removed')
      toastr.error("Survey removed")
      getting()
    })
  }

  $scope.edit = function (id) {
    console.log('select survey')
    console.log(id)
    $http.get('/ankete/' + id).then(function (response) {
      console.log('selected')
      $scope.ankete = response.data
    })
  }

  $scope.update = function () {
    console.log('update survey')
    console.log($scope.ankete._id)
    $http.put('ankete/' + $scope.ankete._id, $scope.ankete).then(function (response) {
      console.log('update')
      $scope.ankete.name = ''
      $scope.ankete.question1 = ''
      $scope.ankete.answer11 = ''
      $scope.ankete.answer12 = ''
      $scope.ankete.answer13 = ''
      $scope.ankete.answer14 = ''
      $scope.ankete.question2 = ''
      $scope.ankete.answer21=''
      $scope.ankete.answer22 = ''
      $scope.ankete.answer23 = ''
      $scope.ankete.answer24 = ''
      toastr.success("survey updated successfully")
      getting()
    })
  }
};