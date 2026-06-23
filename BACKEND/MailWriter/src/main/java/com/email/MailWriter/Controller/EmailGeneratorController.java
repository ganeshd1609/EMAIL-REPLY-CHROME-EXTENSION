package com.email.MailWriter.Controller;


import com.email.MailWriter.EmailRequest;
import com.email.MailWriter.Service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@CrossOrigin(origins = "*")
@Getter
@Setter
@RestController
@RequestMapping("/api/email")
public class EmailGeneratorController {


    private final EmailGeneratorService emailGeneratorService;


    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
       String response= emailGeneratorService.generateEmailReplay(emailRequest);
        return ResponseEntity.ok(response);
    }
}
