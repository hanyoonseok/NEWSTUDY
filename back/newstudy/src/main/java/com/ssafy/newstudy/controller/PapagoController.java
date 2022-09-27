package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.service.PapagoService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@Api(value = "NAVER PAPAGO API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/translate")
public class PapagoController {

    private final PapagoService papagoService;

    @PostMapping()
    public ResponseEntity<?> translate(@RequestBody Map<String, String> map) {
        return new ResponseEntity<>(papagoService.translate(map.get("input")), HttpStatus.OK);
    }
}
