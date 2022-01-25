package Duo.SimpleBox;

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping
@RequiredArgsConstructor
public class PandoraController {
    private final PandoraService pandoraService;
    private final MemberRepository memberRepository;
    private String directoryPath="/SpringBoot/Simplebox/src/main/resources/static";
    @PostMapping("/pandora")
    public String savePandora(@RequestParam("files") MultipartFile file,
                              @RequestParam("name")String name,
                              @RequestParam("count")String count,
                              Model model) throws IOException {
        System.out.println("hello");

        ///임시 작업 중

        int iCount=Integer.parseInt(count);

        //file 저장.
        saveFile(file,directoryPath);

        //db에는 fileLocation 저장
        Long savedPandoraId = pandoraService.makePandora(name, iCount, directoryPath);
        Pandora newPandora = pandoraService.findOne(savedPandoraId);

        return newPandora.getKey();
    }



    private void saveFile(MultipartFile file,String directoryPath) throws IOException{
        Path directory = Paths.get(directoryPath).toAbsolutePath().normalize();
        // 파일명을 바르게 수정한다.
        // directory 해당 경로까지 디렉토리를 모두 만든다.
        Files.createDirectories(directory);

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // 파일명에 '..' 문자가 들어 있다면 오류를 발생하고 아니라면 진행(해킹및 오류방지)
        Assert.state(!fileName.contains(".."), "Name of file cannot contain '..'");

        //파일을 저장할 경로를 Path 객체로 받는다.
        Path targetPath=directory.resolve(fileName).normalize();

        //파일이 이미 존재하는지 확인
        Assert.state(!Files.exists(targetPath), fileName + " File already exists.");
        file.transferTo(targetPath);
    }

}
