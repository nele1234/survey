
function getSurvey($scope, $http, toastr, $location) {

  var config = {headers:  {
    'Authorization': 'Basic TmljayBDZXJtaW5hcmE6cGFzc3dvcmQ=',
    'Accept': 'application/json;odata=verbose',
    "JWT" : localStorage.getItem('user')
    }
 };
var getting = function(){
    $http.get("/rest/v1/anketa",config)
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

  $scope.logout = function(){
    localStorage.clear();

    $location.url("/login");
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
      $scope.anketa = response.data
    })
  }

  $scope.update = function () {
    console.log('update survey')
    console.log($scope.anketa._id)
    $http.put('ankete/' + $scope.anketa._id, $scope.anketa).then(function (response) {
      console.log('update')
      $scope.anketa.name = ''
      $scope.anketa.question1 = ''
      $scope.anketa.answer11 = ''
      $scope.anketa.answer12 = ''
      $scope.anketa.answer13 = ''
      $scope.anketa.answer14 = ''
      $scope.anketa.question2 = ''
      $scope.anketa.answer21=''
      $scope.anketa.answer22 = ''
      $scope.anketa.answer23 = ''
      $scope.anketa.answer24 = ''
      toastr.success("survey updated successfully")
      getting()
    })
  }
  $scope.sendAppFeed = function () {
    console.log('Feedback sent');
    console.log($scope.feed);
    $http.post('/sendingAppFeed', $scope.feed).then(function (response) {
      console.log(response)
      $scope.feed.text = "";
      toastr.success("Thanks!!!")
    })
  }
  
  $scope.addregistration = function () {
    console.log('registracija dodana')
    $http.post('/registracija', $scope.user).then(function (response) {
      console.log(response)
      toastr.success("registracija dodana");
      getting()
    })
  }
};