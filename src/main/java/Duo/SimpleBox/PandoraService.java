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
    private final FileRepository fileRepository;
    @Transactional
    public Long makePandora(String name, String code, int count, String path, List<String> fileNames) {
        Pandora pandora=new Pandora(name,code,count);
        for (String fileName : fileNames) {
            File file = File.createFile(pandora, fileName, path);
            fileRepository.save(file);
            pandora.addFile(file);
        }
        pandoraRepository.save(pandora);
        return pandora.getId();
    }
    @Transactional
    public Long makePandora(String name,String code,int count,String path,String fileName){
        Pandora pandora=new Pandora(name,code,count);
        File file = File.createFile(pandora, fileName, path);
        fileRepository.save(file);
        pandora.addFile(file);
        pandoraRepository.save(pandora);


        /////////////
        return pandora.getId();
    }

    @Transactional
    public void decreaseCount(Long id){
        Pandora pandora = pandoraRepository.findOne(id);
        pandora.decrease();
    }

    public List<File> findFiles(Long pandoraId){
        return fileRepository.findByPandoraId(pandoraId);
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

    public File findFileByFileId(Long fileId) {
        return fileRepository.findById(fileId);
    }


}
