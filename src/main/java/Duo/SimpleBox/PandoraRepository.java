package Duo.SimpleBox;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class PandoraRepository {
    @PersistenceContext
    EntityManager em;

    public Long save(Pandora pandora){
        em.persist(pandora);
        return pandora.getId();
    }

    public Pandora findOne(Long id){
        return em.find(Pandora.class,id);
    }
    public List<Pandora> findAll(){
        return em.createQuery("select p from Pandora p",Pandora.class)
                .getResultList();
    }
    public List<Pandora> findByName(String name){
        return em.createQuery("select p from Pandora p where p.name=:name",Pandora.class)
                .setParameter("name",name).getResultList();

    }

    public Pandora findByKey(String key){
        return em.createQuery("select p from Pandora p where p.key=:key",Pandora.class)
                .setParameter("key",key).getSingleResult();
    }


}
