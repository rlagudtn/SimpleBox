package Duo.SimpleBox;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

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

    public List<File> findByPandoraId(Long pandoraId) {
        String jpql="select f from File f join f.pandora p where " +
                "p.id=:pandoraId";
        List<File> files = em.createQuery(jpql, File.class).
                setParameter("pandoraId", pandoraId).getResultList();
        return files;
    }
}
