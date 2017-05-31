#!groovy

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

    } catch(Exception e) {
        throw e;
    }
}
