package Duo.SimpleBox;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Pandora {
    Pandora(){}
    Pandora(String name, String key, int count, String fileLocation, String fileNames){
        this.name=name;
        this.key=key;
        this.count=count;
        this.fileLocation = fileLocation;
        this.fileNames = fileNames;
    }

    void decrease(){
        this.count -= 1;
    }

    @Id @GeneratedValue
    private Long id;

    private String name;

//    @Column(unique = true)
    private String key;

    private int count;

    private String fileLocation;

    private String fileNames;
}
