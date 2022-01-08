package Duo.SimpleBox;


import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping
public class HelloController {
    String s;

    @GetMapping("/api/hello")
    public String hello(){
        return "get complete!";
    }

    @PostMapping("/api/hello")
    public String bye(@RequestBody Map<String, String> param){
        System.out.println(param);
        System.out.println(param.get("data"));
        this.s = param.get("data");
        return this.s;
    }

    @RequestMapping("/api/banzai")
    public String ban(@RequestParam("img") MultipartFile file) throws IOException {
        System.out.println("hello");
        saveFiole(file, "/SpringBoot/demo/demo/src/main/resources/static");
        return this.s;
    }

    private void saveFiole(MultipartFile file, String directoryPath) throws IOException {
        // parent directory를 찾는다.
        Path directory = Paths.get(directoryPath).toAbsolutePath().normalize();

        // directory 해당 경로까지 디렉토리를 모두 만든다.
        Files.createDirectories(directory);

        // 파일명을 바르게 수정한다.
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // 파일명에 '..' 문자가 들어 있다면 오류를 발생하고 아니라면 진행(해킹및 오류방지)
        Assert.state(!fileName.contains(".."), "Name of file cannot contain '..'");
        // 파일을 저장할 경로를 Path 객체로 받는다.
        Path targetPath = directory.resolve(fileName).normalize();

        // 파일이 이미 존재하는지 확인하여 존재한다면 오류를 발생하고 없다면 저장한다.
        Assert.state(!Files.exists(targetPath), fileName + " File already exists.");
        file.transferTo(targetPath);
    }

}
