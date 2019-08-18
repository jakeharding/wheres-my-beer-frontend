node {
  load "${JENKINS_HOME}/project_props/draught-picks-frontend.properties"

  def json = readJSON file:'package.json'
  def (major, minor, patch) = json.version =~ /\d+/
  println "MAJOR: ${major}"
  println "MINOR: ${minor}"
  println "PATCH: ${patch}"
  println "VERSION: ${json.version}"
  patch =  patch.toInteger() + 1
  println "NEW VERSION: ${major}.${minor}.${patch}"

}
pipeline {
  agent any
  environment {
    PATH="/usr/local/bin:$PATH"
    PROJECT_NAME="draught-picks-frontend"
  }
  tools { nodejs "NodeTen" }
  stages {
    stage('env') {
      steps {
        script {
          if (env.BRANCH_NAME.startsWith('PR')) {
            env.JOB_BASE_NAME = "${env.CHANGE_BRANCH}"
          }
          sh 'git pull -t'
          def tag = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
          println "TAG: ${tag}"
        }

        sh '''
        #!/bin/bash
        git remote set-url origin git@github.com:jakeharding/draught-picks-frontend.git
        echo "REST_API_ROOT=http://localhost:8000/api/dev" > .env
        echo >> .env
        echo "GA_ENV=dev" >> .env
        echo >> .env
        echo "repo_token: $COVERALLS_TOKEN" > .coveralls.yml
        '''
      }
    }
    stage('deps') {
      steps {
        sh '''
        #!/bin/bash
        yarn install
        '''
      }
    }

    stage('test') {
      steps {
        sh '''
        #!/bin/bash
        yarn test:ci
        '''
      }
    }

    stage('build') {
      when  {
        expression { !env.BRANCH_NAME.startsWith('PR') }
      }
      steps {
        sh '''
        #!/bin/bash
        yarn build
        '''
      }
    }
    stage('zip') {
      when {
        expression { env.BRANCH_NAME == 'develop' }
      }
      steps {
        zip zipFile: 'bundle.zip', archive: true, dir: './www/'
      }
    }
    stage('ship') {
      when {
        expression { env.BRANCH_NAME == 'develop' }
      }
      steps {
        sh '''
        #!/bin/bash
        echo "SHIP IT WITH THE PUBLISH OVER SSH PLUGIN?
        '''
      }
    }
  }
}
