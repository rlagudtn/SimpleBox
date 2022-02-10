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

    @Transactional
    public Long makePandora(String name,String code,int count,String fileLocation,String fileNames){
        Pandora pandora=new Pandora(name,code,count,fileLocation,fileNames);

        pandoraRepository.save(pandora);

        return pandora.getId();
    }

    @Transactional
    public void decreaseCount(Long id){
        Pandora pandora = pandoraRepository.findOne(id);
        pandora.decrease();
    }

    public List<Pandora> findPandoraByName(String name){
        return pandoraRepository.findByName(name);
    }

    public List<Pandora> findPandoraByWord(String word){
        return pandoraRepository.findByWord(word);
    }

    public Pandora findOne(Long pandoraId){
        return pandoraRepository.findOne(pandoraId);
    }

    private String generateKey(){
        return "1234";
    }


}
