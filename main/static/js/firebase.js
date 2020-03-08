$(function(){

// TODO: Replace the following with your app's Firebase project configuration
    var firebaseConfig = {

        "type": "service_account",
        "project_id": "stressband-bed7e",
        "private_key_id": "04be28f7b10701c3930b154807482f77a405c3ff",
        "private_key": "nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDE8FP42caxdpZv\nH//5pFk3JN2gi7XTzfsi5p+SwyLXSFOgWfNpnZfHvibOxxCLcqj7h+8jTTDPNMtM\nv68ajN1yqiEIgba+rsMbnDOLkPtc2fxjKVnBfUpB4Tt3zRCGw0lp7QzZetztKZdD\nmU4I65lFMNs0RNsGCSH6t1A/yK4SaSPmqeS+zowktkXeTRbEhc1YMnlyYBs6KBAV\nCUNC6kL6j1GGjdXfW/ZnyxawsqfUzGFkOBzuWERAutPL9lbCnN9prFatUB69VpFD\nBFWqeUbtTkdU8sDPKsIALIcJl3mnNtHY34fw0LajmrnBcOXlmDaPbXBzEDPVNui+\nm/pjQQyPAgMBAAECggEAHHvAlBFgp3IbYonM9UehOlSJVBsLeqLOsRw3StFmTJ9t\nWO0pmMZDmY7AViUnGMQbT1CNycae9JkSKPuK+9q70fBr7qsJdJ1vd/go4bAKauzW\n5WX++/kpsErp1Z3scfv0tkP5bnWoAQqEPNwDaU7fUB6M1bZ6ZxkTDQv4/gCsYdpf\nAPDt/Hlj/u3Bb1caLfxFQiH3Dz/40c+0TUkDgwJH7s/KSRIxeqsWSB87BuqDRe6y\nQMUfJV7Cv7U/Ur/gZry2aLj8DTZETRlxiSXVChoSJGytUaxIXclOBolI4CA4quIz\nKnFt0JrL7+mneoI9DYLoORPTCjjFFmlqiGXrqM3voQKBgQD8qi9L9TVfiGIJNkF+\nHuiSgQITQcC3aNYw7cJKB6pksMsQM/5Osc3io+N/zy6IApf62TqhSHkyZuhKCE7x\npMagj4MdNtraugZDjfI2wXA6FUE3sVGjLXPSq4aSfdJwJyxZUiI7/T/CTc0qAwYo\nL8ZdaljkrTvUm1nn+gfXSVpW2wKBgQDHidTnk7UIqdJfYIywh1XE4G3D5JgdJwwP\n2WL35f/xINR3YyYOTYRmkz/Wq36Xb8UxzTsQRM6cELPrUTvILvKpuqsFp/I3yVNL\nFJ/MvFWHwMizo/I6kH4LBvSwxZK+qHm5eOUwh0P8JflLf8i0bR1+8EBU8fvbvLHM\n+LW7yPEtXQKBgQC28wu4Nl9lQz2pae3WQs8odd1o0C2ZIIInf6E1NYO90P3YR62W\nkcyAlSb/vqb0uNwPOQfpDK8lPbppEMcI1cU1MXVAzB2ATz6F39xIpZx7kjRc/Tod\nq6W4H5cbr5uWtea47m33fhKSwP8TsojcxGsf7Qdc3cr60VoyTKssyeJuDQKBgFOj\n2+GiUZ0rCiq+ntqUMAiRhpE5beWya2TtW4XMHCen+kd9AQO3zIruqDDEvBCgYklI\n3LwqC2zxt2kpKOT1gPRSccOyLV7i/g4XvBAm1bdMwRRD4ZJY5OycYs8CUkum9Tcg\njPl1ibLU/BWAn9G5d0axUFYLBOaLxv/DNPJc/XNlAoGAFQSfTwk3K8J34ltoW+3i\n69YbAhTqoqw/69PIq11vhdojqLTAidhprw/whcFwLXqdOzBfejW5yfEeF9gGf0Kj\n2cp4FlazuvRhA5VXi2C3J3JaE1pIZPjtZ3ajmSLEOmMojayXRtMMNf5yBBfCuvc1\nBFX9lIZIGif2S33/7ZfrAIM=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-rhufa@stressband-bed7e.iam.gserviceaccount.com",
        "client_id": "100591240514814919400",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rhufa%40stressband-bed7e.iam.gserviceaccount.com",
        "databaseURL" : "https://stressband-bed7e.firebaseio.com/"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database().ref();
    database.on('value', function(snapshot) {
        console.log(snapshot.val().BPM);
        $("#bpm").text(snapshot.val().BPM);
        $("#gsr").text(snapshot.val().GSR);
        $("#temp").text(snapshot.val().Temperature);
        $("#overall").text(snapshot.val().overall);
    });
    
});