package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Rol;

import java.util.List;

public interface IRolRepository {
    List<Rol> getRols();

    Rol findProductById(Integer idProducto);

    void saveRol(Rol rol);


}
