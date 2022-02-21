package Duo.SimpleBox;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Pandora {
    Pandora() {
    }
    Pandora(String name,String key,int count){
        this.name = name;
        this.key = key;
        this.count = count;
    }

    void decrease() {
        this.count -= 1;
    }

    @Id
    @GeneratedValue
    @Column(name = "pandora_id")
    private Long id;

    private String name;

    //    @Column(unique = true)
    private String key;

    private int count;


    @OneToMany(mappedBy = "pandora")
    private List<File> files = new ArrayList<>();

    ////연관관계 메서드
    public void addFile(File file) {
        this.files.add(file);
        file.setPandora(this);
    }

}
