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
<<<<<<< HEAD
    public Long makePandora(String name,int count,String fileLocation){
=======
    public Long makePandora(String name,int count,String fileLocation,String fileName){
>>>>>>> 061c171083cf431d4fe7925e14a486eaa81c7c55
        String newKey=generateKey();

        Pandora pandora=new Pandora(name,newKey,count,fileLocation,fileName);

        pandoraRepository.save(pandora);

        return pandora.getId();
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
