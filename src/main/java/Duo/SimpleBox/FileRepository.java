package Duo.SimpleBox;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class FileRepository {
    @Autowired
    EntityManager em;
    public Long save(File file){
        em.persist(file);
        return file.getId();
    }

    public File findById(Long id) {
        return em.find(File.class, id);
    }
}
