#!groovy

GOOGLE_PLAY_COLLECTOR_ARTIFACT = 'mirrorgate-google-play-collector.zip'

node ('global') {

    try {

        stage('Checkout') {
            checkout(scm)
        }

        stage('Build') {
            sh """
                docker-compose -p \${BUILD_TAG} run -u \$(id -u) install
            """
        }
        
        stage('Package Zip') {
            sh """
                docker-compose -p \${BUILD_TAG} run -u \$(id -u) package
            """
        }

        stage('Publish on Jenkins') {
      	    step([$class: "ArtifactArchiver", artifacts: "build/${GOOGLE_PLAY_COLLECTOR_ARTIFACT}", fingerprint: true])
        }

    } catch(Exception e) {
        throw e;
    }
}
