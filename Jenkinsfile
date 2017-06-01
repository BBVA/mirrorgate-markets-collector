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
        
        stage('Package Zip') {
            sh """
                ./node_modules/gulp/bin/gulp.js package
            """
        }

    } catch(Exception e) {
        throw e;
    }
}
