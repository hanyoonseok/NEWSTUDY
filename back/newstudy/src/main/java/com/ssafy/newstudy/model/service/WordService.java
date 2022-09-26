package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.WordDao;
import com.ssafy.newstudy.model.dto.WordResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordDao wordDao;

    /**
     * crossWord 위한 var
     */
    private int R = 50, C = 50, WORD_CNT;
    private String [] word_list;
    private boolean check [];
    private char [][] map = new char[R][C];
    private Queue<int []> q = new LinkedList<>();
    private List<WordResponseDto> payload = new LinkedList<WordResponseDto>();

    /**
     * crossWord 위한 list
     * @param list
     * @return
     */
    public List<WordResponseDto> getCrossWord(List<WordResponseDto> list) {
        word_list = new String[list.size()];
        for(int i = 0 ; i < word_list.length ; i++) {
            word_list[i] = list.get(i).getEng();
        }
        WORD_CNT = word_list.length;
        check = new boolean [WORD_CNT];
        q.add(new int [] {0, 0, 1, 0, 0}); // [r, c, d, idx]

        for(int i=0; i<R; i++) Arrays.fill(map[i], ' ');

        while(!q.isEmpty()) {
            int cur [] = q.poll();
            String curStr = word_list[cur[3]];

            if(check[cur[3]]) continue;

            if(isValidPos(cur[0], cur[1], cur[2], curStr)) {
                check[cur[3]] = true;
                putWord(cur[0], cur[1], cur[2], curStr);
                payload.add(new WordResponseDto().setWord(cur[0], cur[1], cur[2], curStr));
                addWordToQueue(cur[0], cur[1], cur[2], curStr);
            }else if(cur[4] != 0){ // 무인도에 넣음
                if(cur[2] > 0) {
                    outer:for(int i=0; i<C; i++) {
                        for(int j=0; j<R; j++) {
                            if(map[j][i] != ' ') continue;

                            if(isValidPos(j, i, cur[2], curStr)) {
                                check[cur[3]] = true;
                                putWord(j, i, cur[2], curStr);
                                payload.add(new WordResponseDto().setWord(j, i, cur[2], curStr));
                                addWordToQueue(j,i,cur[2],curStr);
                                break outer;
                            }
                        }
                    }
                }else {
                    outer:for(int i=0; i<R; i++) {
                        for(int j=0; j<C; j++) {
                            if(map[i][j] != ' ') continue;

                            if(isValidPos(i, j, cur[2], curStr)) {
                                check[cur[3]] = true;
                                putWord(i, j, cur[2], curStr);
                                payload.add(new WordResponseDto().setWord(i, j, cur[2], curStr));
                                addWordToQueue(i,j,cur[2],curStr);
                                break outer;
                            }
                        }
                    }
                }

            }

            if(q.isEmpty()) {
                for(int i=0; i<WORD_CNT; i++) {
                    if(!check[i]) {
                        q.add(new int [] {0,0, cur[2] > 0 ? -1 : 1, i, 1});
                        break;
                    }
                }
            }
        }

        getWordDescription(list, payload);

        return payload;
    }

    private void getWordDescription(List<WordResponseDto> list, List<WordResponseDto> payload){
        outer : for(int i = 0 ; i < payload.size() ; i++){
            for(int j = 0 ; j < list.size() ; j++) {
                if(payload.get(i).getEng().equals(list.get(j).getEng())) {
                    payload.get(i).setDescription(list.get(j).getDescription());
                    continue outer;
                }
            }
        }
    }

    private void addWordToQueue(int r, int c, int dir, String curStr) {
        for(int i=0; i<curStr.length(); i++) {
            char curChar = curStr.charAt(i);

            for(int j=0; j<WORD_CNT; j++) {
                if(check[j]) continue;

                for(int k=0; k<word_list[j].length(); k++) {
                    char nextChar = word_list[j].charAt(k);
                    if(curChar != nextChar) continue;

                    if(dir > 0) {
                        if(r-k < 0 || r-k >= R || c+i < 0 || c+i >= C) continue;
                        if(map[r-k][c+i] == ' ' || map[r-k][c+i] == word_list[j].charAt(0))
                            q.add(new int [] {r - k, c + i, -1, j, 0});
                    }
                    else {
                        if(r+i < 0 || r+i >= R || c-k < 0 || c-k >= C) continue;
                        if(map[r+i][c-k] == ' ' || map[r+i][c-k] == word_list[j].charAt(0))
                            q.add(new int [] {r+i, c-k, 1, j, 0});
                    }
                }
            }
        }
    }

    private void putWord(int r, int c, int dir, String word) {
        int len = word.length();
        if(dir > 0) { // 오른쪽으로 전개
            for(int i=c; i<c+len; i++) map[r][i] = word.charAt(i - c);
        }else { //아래로 전개
            for(int i=r; i<r+len; i++) map[i][c] = word.charAt(i - r);
        }
    }

    private boolean isValidPos(int r, int c, int dir, String word) {
        if(r < 0 || r >= R || c < 0 || c >= C) return false;

        if(dir > 0) { // 우측으로 둬야하는 경우
            // 딱 붙는 글자 있으면 안됨
            if(c >= 1 && map[r][c-1] != ' ') return false;
            if(c + word.length() < C-1 && map[r][c + word.length()] != ' ') return false;
            if(c < C-1 && map[r][c+1] != ' ') {
                if(map[r][c+1] != word.charAt(1)) return false;
            }

            for(int i=c; i<c + word.length(); i++) {
                if(i >= C || i < 0) return false;

                if(map[r][i] != ' ' && map[r][i] != word.charAt(i-c))return false;
                else if(map[r][i] != ' ' && map[r][i] == word.charAt(i-c)) continue;

                if(r == 0 && map[r+1][i] != ' ') return false;
                else if( r == R-1 && map[r-1][i] != ' ') return false;
                else if(r >= 1 && r < R-1) {
                    if(map[r-1][i] != ' ' || map[r+1][i] != ' ') return false;
                }

            }
        }else { //아래로 둬야하는 경우
            if(r >= 1 && map[r-1][c] != ' ') return false;
            if(r + word.length() < R-1 && map[r + word.length()][c] != ' ') return false;
            if(r < R-1 && map[r+1][c] != ' ') {
                if(map[r+1][c] != word.charAt(1)) return false;
            }

            for(int i=r; i<r + word.length(); i++) {
                if(i >= R || i < 0) return false;

                if(map[i][c] != ' ' && map[i][c] != word.charAt(i-r)) return false;
                else if(map[i][c] != ' ' && map[i][c] == word.charAt(i-r)) continue;

                if(c == 0 && map[i][c+1] != ' ') return false;
                else if(c == C-1 && map[i][c-1] != ' ') return false;
                else if(c >= 1 && c < C-1) {
                    if(map[i][c-1] != ' ' || map[i][c+1] != ' ') return false;
                }

            }
        }

        return true;
    }

    public List<WordResponseDto> getWordTest(){
        return wordDao.selectWordTestList();
    }

    public List<WordResponseDto> getWordGame(){
        return wordDao.selectWordGameList();
    }
}
