package com.web_programming.tesis.Controller;


import com.web_programming.tesis.Services.TestServices;
import com.web_programming.tesis.Services.UsersServices;
import com.web_programming.tesis.Models.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("plataforma-programuat")
@CrossOrigin(value = "http://localhost:4200")
public class UsersController {
    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private UsersServices usersServices;

    @Autowired
    private TestServices testServices;

    @GetMapping("/login")
    public ResponseEntity<Optional<Users>> getUserByEmail(@RequestParam String email,
                                                          @RequestParam String password){
        Optional<Users> user = this.usersServices.findByEmail(email);
        if(user != null)
        {
            Users userPresent = user.get();
            //logger.info("Contraseña object: "+userPresent.getPassword());
            //logger.info("Contraseña parametro: "+password);
            if(Objects.equals(userPresent.getPassword(), password))
            {
                logger.info("Si entra aca");
                return ResponseEntity.ok(user);
            }

            logger.info("Contraseña incorrecta");
            throw null;
        }
        logger.info("No se encontró ningun email con ese nombre");
        throw null;
    }

    @GetMapping("/log")
    public List<Users> getUserByEmail(){
        List<Users>  users = this.usersServices.getUsers();
            return users;
    }

    @PostMapping(value = "/create-account", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean saveUser(@RequestBody Users user){
        //try {
            //logger.info("Usuario"+ user);
            this.usersServices.saveUser(user);;
            user.getTest().setUser(user);
            this.testServices.saveTest(user.getTest());
            return true;
        //}
        /*catch (Error e){
            logger.info(e.getMessage());
            return false;
        }*/
    }

}
