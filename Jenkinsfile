#!groovy

GOOGLE_PLAY_COLLECTOR_ARTIFACT = 'mirrorgate-google-play-collector.zip'

node ('global') {

    try {

        stage('Checkout') {
            checkout(scm)
        }

        stage('Build') {
            sh """
                npm install
            """
        }
        
        stage('Package Zip') {
            sh """
                ./node_modules/gulp/bin/gulp.js package
            """
        }

        stage('Publish on Jenkins') {
      	    step([$class: "ArtifactArchiver", artifacts: "build/${GOOGLE_PLAY_COLLECTOR_ARTIFACT}", fingerprint: true])
        }

    } catch(Exception e) {
        throw e;
    }
}
