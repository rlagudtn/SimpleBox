package Duo.SimpleBox;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FileRepositoryTest {
    @Autowired
    FileRepository fileRepository;
    @Autowired PandoraRepository pandoraRepository;
    @Test
    @Transactional
    public void 파일저장(){
        //given
        Pandora pandora=new Pandora("123","123",5);
        File file1 = File.createFile(pandora, "스프링 프로젝트.zip", "/src/main/resources/static");
        File file2 = File.createFile(pandora, "스프링 프로젝트.zip", "/src/main/resources/static");

        //when
        Long saved = fileRepository.save(file1);
        Long saved2 = fileRepository.save(file2);
        pandoraRepository.save(pandora);

        //then
        List<File> files = fileRepository.findByPandoraId(pandora.getId());

        Assertions.assertThat(files.size()).isEqualTo(2);

    }
}