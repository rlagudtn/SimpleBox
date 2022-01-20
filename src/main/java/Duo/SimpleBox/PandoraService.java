package Duo.SimpleBox;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PandoraService {
    private final PandoraRepository pandoraRepository;

    public Long makePandora(String name,int count,String fileLocation){
        String newKey=generateKey();

        Pandora pandora=new Pandora(name,newKey,count,fileLocation);

        pandoraRepository.save(pandora);

        return pandora.getId();
    }

    public List<Pandora> findPandoraByName(String name){
        return pandoraRepository.findByName(name);
    }

    public Pandora findOne(Long pandoraId){
        return pandoraRepository.findOne(pandoraId);
    }

    private String generateKey(){
        return "1234";
    }


}
