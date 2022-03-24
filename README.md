# SimpleBox 
파일 저장 및 공유 웹사이트
---
### Spring 프레임워크 및 JPA를 이용한 파일 저장 및 공유 웹사이트

![메인 화면](https://user-images.githubusercontent.com/34295144/159826906-d4140715-5092-4002-bab0-c4b1c6aaa5b2.jpg)

---
## 개발 목표
#### Spring 프레임 워크& JPA를 사용하여 CRUD 기능 및 파일 업로드 구현을 위한 웹 페이지

---
## 사용 기술
* JAVA
* Spring 프레임워크
* JPA
* React 프레임워크

---
## Advanced Feature
##드래그 앤 드롭을 지원하는 다중 파일 업로드

* 화면
>
![drag drop2](https://user-images.githubusercontent.com/34295144/159830327-28825b74-08e1-4655-adad-0024da743092.png)
>
![drag&drop](https://user-images.githubusercontent.com/34295144/159830176-c6472f1a-b756-4535-9409-44b29ccb3c95.png)


* 코드
```java
@PostMapping("/pandora")
public String savePandora(@RequestParam("files") List<MultipartFile> files,
                          @RequestParam("name") String name,
                          @RequestParam("count") String count,
                          @RequestParam("code") String code) throws IOException {

    String ret="";
    int iCount=Integer.parseInt(count);
    List<String> fileNames=new ArrayList<>();
    
    
    try{
        for (MultipartFile file : files) {
            //DB에 메타데이터를 저장하기 위해 file의 원래 이름을 리스트에 넣어줌
            fileNames.add(file.getOriginalFilename());
            
            //실제 저장소에 파일 저장
            saveFile(file,directoryPath);
        }

        //DB에 Pandora 및 file의 메타데이터 저장
        Long savedPandoraId = pandoraService.makePandora(name,code, iCount, directoryPath, fileNames);
        Pandora newPandora = pandoraService.findOne(savedPandoraId);
        ret=newPandora.getKey();
    }
    catch (IOException e){
        System.err.println("IOException occurred!");
    }
    return ret;
}
```

---
## 개선 사항
* 코드 리팩토링 진행
* 대용량 파일 업로드 기능 추가
