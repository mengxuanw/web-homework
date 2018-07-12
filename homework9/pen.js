var app = angular.module("myApp",[]);
app.controller("myCtrl",function($scope, $interval){
    $scope.breakLength = 5;
    $scope.sessionLength = 25;
    $scope.session = "Session";
    $scope.timeLeft = $scope.sessionLength;
    $scope.fillHeight = '0%';
    $scope.fillColor = 'green';
    var runTime = false;
    var originalTime = $scope.sessionLength;
    var secs = 60*$scope.timeLeft;

    $scope.breakLengthChange = function(time){
        if(!runTime && $scope.session === "Break")
        {
            $scope.breakLength += time;
            if($scope.breakLength < 1){
                $scope.breakLength = 1;
            }
            $scope.timeLeft = $scope.breakLength;
            originalTime = 60 * $scope.breakLength;
            secs = 60 * $scope.breakLength;
        }
    }

    $scope.sessionLengthChange = function(time){
        if(!runTime && $scope.session === "Session")
        {
            $scope.sessionLength += time;
            if($scope.sessionLength < 1){
                $scope.sessionLength = 1;
            }
            $scope.timeLeft = $scope.sessionLength;
            originalTime = 60 * $scope.sessionLength;
            secs = 60 * $scope.sessionLength;
        }
    }

    $scope.toggleTimer = function(){
        if(runTime === false)
        {
            runTimer = $interval(updateTimer,1000);
            runTime = true;
        } 
        else
        {
            $interval.cancel(runTimer);
            runTime = false;
        }   
    }

    function secondsToHms(s){
        s = Number(s);
        var h = Math.floor(s/3600);
        var m = Math.floor(s%3600/60);
        var s = Math.floor(s%3600%60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }
    function updateTimer(){
        secs -= 1;
        if(secs < 0){
            var wav = "two-turtle-doves.mp3";
            var audio = new Audio(wav);
            audio.play();
            $scope.fillHeight = '0%';
            if($scope.session === "Session"){
                $scope.session = "Break";
                secs = 60 * $scope.breakLength;
                $scope.timeLeft = $scope.breakLength;
                originalTime = 60 * $scope.breakLength;
                $scope.fillColor = 'red';
            }
            else{
                $scope.session = "Session";
                secs = 60 * $scope.sessionLength;
                $scope.timeLeft = $scope.sessionLength;
                originalTime = 60 * $scope.sessionLength;
                $scope.fillColor = 'green';
            }
        }
        else{
            $scope.timeLeft = secondsToHms(secs);
            var perc = Math.abs((secs/originalTime) * 100 -100);
            $scope.fillHeight = perc + '%';
        }
    }
})
