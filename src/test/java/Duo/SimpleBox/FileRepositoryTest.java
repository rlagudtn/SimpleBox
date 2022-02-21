package Duo.SimpleBox;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FileRepositoryTest {
    @Autowired
    FileRepository fileRepository;

    @Test
    @Transactional
    public void 파일저장(){
        //given
        Pandora pandora=new Pandora("123","123",5);
        File file1 = File.createFile(pandora, "스프링 프로젝트.zip", "/src/main/resources/static");

        //when
        Long saved = fileRepository.save(file1);
        //then
        Assertions.assertThat(file1.getName()).isEqualTo(fileRepository.findById(saved).getName());

    }
}