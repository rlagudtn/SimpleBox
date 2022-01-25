package Duo.SimpleBox;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping
@RequiredArgsConstructor
public class PandoraController {
    private final PandoraService pandoraService;
<<<<<<< HEAD
    private final MemberRepository memberRepository;
    private String directoryPath="/SpringBoot/Simplebox/src/main/resources/static";
=======
    private String directoryPath="/Users/SOO/Desktop/SimpleBox/SimpleBox/src/main/resources/static";

>>>>>>> 061c171083cf431d4fe7925e14a486eaa81c7c55
    @PostMapping("/pandora")
    public String savePandora(@RequestParam("files") MultipartFile file,
                              @RequestParam("name")String name,
                              @RequestParam("count")String count,
                              Model model) throws IOException {
        System.out.println(file);
        System.out.println(name);
        String ret="";
        ///임시 작업 중

        int iCount=Integer.parseInt(count);

        //file 저장.

        try{
            saveFile(file,directoryPath);

            //db에는 fileLocation 저장
            Long savedPandoraId = pandoraService.makePandora(name, iCount, directoryPath,file.getOriginalFilename());
            Pandora newPandora = pandoraService.findOne(savedPandoraId);
            ret=newPandora.getKey();
        }
        catch (IOException e){
            System.err.println("IOException 발생했습니다");
        }

        return ret;
    }

    @GetMapping("/pandora")
    public String searchPandoraByKeyword(@RequestParam("keyword") String keyword)
    throws JsonProcessingException{

        List<Pandora> searchedPandora= pandoraService.findPandoraByWord(keyword);
        List<Map<String,String>> pandoraList=new ArrayList<Map<String,String>>();
        for(Pandora pandora:searchedPandora){
            Map<String, String> map = new HashMap<>();
            map.put("id",pandora.getId().toString());
            map.put("name",pandora.getName());
            pandoraList.add(map);
        }

        ObjectMapper mapper = new ObjectMapper();
        String ret=mapper.writeValueAsString(pandoraList);
        System.out.println(ret);
    //react에서
    //let list = JSON.parse ( result~~ );
        return ret;
    }

    @PostMapping("/pandora/download")
    public byte[] downloadPandora(HttpServletResponse response,
                                  @RequestParam("pandoraId")String pandoraId,
                                   @RequestParam("hashCode")String hashCode) throws IOException{
        System.out.println(pandoraId);

        Long downloadId = Long.parseLong(pandoraId);
        Pandora downloadedPandora = pandoraService.findOne(downloadId);
        byte[] bytes=null;

        // db에 있는 pandora의 key값과 react 에서 받은 hashcode 값이 같으면 받아옴.
        if(downloadedPandora.getKey().equals(hashCode)){
            String fileName=downloadedPandora.getFileName();
            String filePath=downloadedPandora.getFileLocation();

            File file=new File(filePath,fileName);
            bytes= FileCopyUtils.copyToByteArray(file);

            String fn = new String(file.getName().getBytes(), "utf-8");
            // 다운로드 되거나 로컬에 저장되는 용도로 쓰이는지를 알려주는 헤더
            response.setHeader("Content-Disposition", "attachment;filename=" + file.getName());
            response.setContentLength(bytes.length);
        }
        /*else{
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }*/
        return bytes;
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
//        Assert.state(!Files.exists(targetPath), fileName + " File already exists.");
        file.transferTo(targetPath);
    }

}
