package Duo.SimpleBox;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PandoraTest {
    @Autowired
    PandoraRepository pandoraRepository;

    @Test
    @Transactional
    @Rollback(value = false)
    public void savePandora()
    {
        //given
        Pandora pandora=new Pandora("실습파일 동영상","1234",10);
        Long saveId = pandoraRepository.save(pandora);

        //when
        Pandora pandora1 = pandoraRepository.findByKey("1234");

        //then
        Assertions.assertThat(pandora1.getId()).isEqualTo(pandora.getId());

    }

    @Test
    @Transactional
    @Rollback(value = false)
    public void findPandoraAll()
    {
        //given
        Pandora pandora=new Pandora("실습파일 동영상1","1234",10);
        Pandora pandora1=new Pandora("실습파일 동영상1","1234543",10);
        pandoraRepository.save(pandora);
        pandoraRepository.save(pandora1);
        //when
        List<Pandora> pandoraList = pandoraRepository.findByName("실습파일 동영상1");

        //then
        Assertions.assertThat(pandoraList.size()).isEqualTo(2);

    }



}