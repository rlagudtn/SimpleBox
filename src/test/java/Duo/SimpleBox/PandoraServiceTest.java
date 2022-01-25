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

public class PandoraServiceTest {
    @Autowired
    PandoraService pandoraService;


    @Test
    @Transactional
    @Rollback(value = false)
    public void 판도라저장(){
        //given
        Long pandoraId = pandoraService.makePandora("실전 스프링 부트", 10, "/file",
                "arr.jpg");

        //when
        Pandora pandora = pandoraService.findOne(pandoraId);

        //then
        Assertions.assertThat(pandora.getKey()).isEqualTo("1234");

    }

    @Test

    public void 판도라이름으로찾기(){
        //given
        pandoraService.makePandora("실전 스프링 부트", 10, "/file","arr.jpg");
        pandoraService.makePandora("실전 스프링 부트1", 10, "/file","arr.jpg");
        pandoraService.makePandora("스프링 부트", 10, "/file","arr.jpg");

        
        //when
        List<Pandora> pandoraList = pandoraService.findPandoraByWord("스프링 부트");
        //then
        Assertions.assertThat(pandoraList.size()).isEqualTo(3);

    }
}