# 공공의 주방
mobile first 구성으로 모바일부터 구성하고 pc 구축

다른 프로젝트 투입으로 모바일만 담당완료 후 pc는 mobile 기준으로 다른 사람이 작업

## IDE
- nvm 필요
```sh
node <= 11
gulp 3.x.x
```

### nvm install
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
터미널을 종료 후 다시 열기 또는 `source ~/zshrc`.   
 `~/.bashrc`, `~/.profile` 또는 `~/.zshrc`파일에 아래 코드가 있나 확인 후 없으면 추가 (보통 자동으로 추가됨)
  - 난 zsh를 사용하고 있으므로 `~/.zshrc`에 확인/추가 
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
 #### version install
 ```sh
 nvm install 11 // v11 lts
 ```
 
 #### version use
 ```sh
 nvm use 11
 ```

### npm install
```sh
npm install
```

### node-sass 에러가 난다면
- node-sass가 deprecated 되서인듯.
```sh
npm rebuild node-sass
```

### gulp start
```sh
gulp // dev
gulp build // build
```
