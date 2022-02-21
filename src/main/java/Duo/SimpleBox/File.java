package Duo.SimpleBox;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class File {
    @Id
    @GeneratedValue
    @Column(name="file_id")
    private Long id;

    private String name;

    private String path;


    File(String name, String path) {
        this.name = name;
        this.path = path;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="pandora_id")
    private Pandora pandora;

    public void setPandora(Pandora pandora) {
        this.pandora=pandora;
    }

    ////생성 메서드
    public static File createFile(Pandora pandora, String name, String path) {
        File file = new File(name, path);
        file.pandora=pandora;
        return file;
    }

}
