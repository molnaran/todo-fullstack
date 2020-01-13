package hu.molnaran.todobackend.util;

import hu.molnaran.todobackend.exception.UploadedFileNotFoundException;
import hu.molnaran.todobackend.exception.AvatarUploadException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Null;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;

@Component
public class FileUtil {

    public void writeImage(String fileName, MultipartFile file, File directory){
        try {
            Path path = Paths.get(directory+"/" + fileName+"."+ FilenameUtils.getExtension(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            throw new AvatarUploadException();
        }
    }

    public void writeResourceFile(String resourcefolder, String filename, String outputFolder) throws IOException{
        ClassPathResource classPathResource = new ClassPathResource(resourcefolder+ "/"+filename);
        try{
            InputStream inputStream = classPathResource.getInputStream();
            Path path = Paths.get(outputFolder+"/" + filename);
            Files.copy(inputStream, path , StandardCopyOption.REPLACE_EXISTING);
        }catch (IOException ioe){
            ioe.printStackTrace();
        }
    }


    public byte[] getSingleFile(String startingWith, File directory) throws FileNotFoundException {
        try{
            File[] filteredFiles = directory.listFiles(new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name)
                {
                    return name.startsWith(startingWith);
                }
            });
            if (filteredFiles.length>0){
                byte[] imageBytes = Files.readAllBytes(filteredFiles[0].toPath());
                return imageBytes;
            }else{
                throw new FileNotFoundException();
            }
        }catch (IOException ioex){
            ioex.printStackTrace();
            throw new FileNotFoundException();
        }catch (NullPointerException ioex){
            ioex.printStackTrace();
            throw new FileNotFoundException();
        }
    }


    public void deleteFilesFromDirectory(String startingWith, File directory){
        try{
            File[] filteredFiles = directory.listFiles(new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name)
                {
                    return name.startsWith(startingWith);
                }
            });
            if (filteredFiles.length>0){
                for (int i = 0; i < filteredFiles.length; i++) {
                    File fileToDelete = FileUtils.getFile(directory,filteredFiles[i].getName());
                    FileUtils.deleteQuietly(fileToDelete);
                }
            }
        }catch (NullPointerException npe){
            npe.printStackTrace();
        }
    }

}
