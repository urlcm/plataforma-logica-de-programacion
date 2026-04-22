package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Rol;
import com.web_programming.tesis.Repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServices implements IRolRepository{

    @Autowired
    private RolRepository rolRepository;

    @Override
    public List<Rol> getRols() {
        return this.rolRepository.findAll();
    }

    @Override
    public Rol findProductById(Integer idProducto) {
        return this.rolRepository.findById(idProducto).orElse(null);
    }

    @Override
    public void saveRol(Rol rol) {
        this.rolRepository.save(rol);
    }
}
