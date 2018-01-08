class Grid {
  constructor(a, b) {
    this.rows_ = a;
    this.cols_ = b;
    this.a = [];
    for (let i = 0; i < this.cols_; i++) {
      this.a[i] = new Array(this.rows_);
    }
  }

  get rows() {
    return this.rows_;
  }
  get columns() {
    return this.cols_;
  }

  set rows(a) {
    this.rows_ = a;
  }

  set columns(a) {
    this.cols_ = a;
  }

  resize(a, b) {
    this.rows_ = a;
    this.cols_ = b;
  }

  static Populate(g) {
    for (let i = 0; i < g.cols_; i++) {
      for (let j = 0; j < g.rows_; j++) {
        let ran = floor(random(100));

        if (ran < slider.value()) {
          g.a[i][j] = new Human(i, j);
        } else if (ran < slider.value() + ((100 - slider.value()) / 3)) {
          if (toggleZombiesBox.checked()) {
            g.a[i][j] = new Zombie(i, j);
          } else {
            g.a[i][j] = new Dead(i, j);
          }
        } else {
          g.a[i][j] = new Dead(i, j);
        }
        // switch (floor(random(4))) {
        //   case 0:
        //     if (toggleZombiesBox.checked()) {
        //       g.a[i][j] = new Zombie(i, j);
        //     } else {
        //       g.a[i][j] = new Dead(i, j);
        //     }
        //     break;
        //   case 1:
        //   case 2:
        //     g.a[i][j] = new Dead(i, j);
        //     break;
        //   case 3:
        //     g.a[i][j] = new Human(i, j);
        //     break;
        // }
      }
    }
  }

  static PopulateEmpty(g) {
    for (let i = 0; i < g.cols_; i++) {
      for (let j = 0; j < g.rows_; j++) {
        g.a[i][j] = new Dead(i, j);
      }
    }
  }

  static Display(g) {
    for (let i = 0; i < g.cols_; i++) {
      for (let j = 0; j < g.rows_; j++) {
        g.a[i][j].Display();
      }
    }
  }

  Calculate(g) {
    for (let i = 0; i < this.cols_; i++) {
      for (let j = 0; j < this.rows_; j++) {
        let humanCount = 0;
        let zombieCount = 0;

        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            if (i + x >= 0 && j + y >= 0 && i + x < this.cols_ && j + y < this.rows_ && (x != 0 && y != 0)) {
              if (g.a[i + x][j + y].Species === "HUMAN") {
                humanCount += 1;
              }
              if (g.a[i + x][j + y].Species === "ZOMBIE") {
                zombieCount += 1;
              }
            } else if (!(x == 0 && y == 0)) {
              let a = i + x;
              let b = j + y;
              if (a < 0) {
                a = this.cols_ - 1;
              }
              if (b < 0) {
                b = this.rows_ - 1;
              }
              if (a >= this.cols_) {
                a = 0;
              }
              if (b >= this.rows_) {
                b = 0;
              }
              if (g.a[a][b].Species === "HUMAN") {
                humanCount += 1;
              }
              if (g.a[a][b].Species === "ZOMBIE") {
                zombieCount += 1;
              }
            }
          }
        }
        if ((g.a[i][j].Species == "HUMAN" && (humanCount >= 2 && humanCount <= 3)) || (g.a[i][j].Species == "DEAD" && (humanCount == 3))) {
          this.a[i][j] = new Human(i, j);
        } else if ((g.a[i][j].Species == "HUMAN" && (humanCount < 2 && humanCount > 3)) || (g.a[i][j].Species == "HUMAN" && zombieCount > 3) || (g.a[i][j].Species == "ZOMBIE" && (humanCount > 1))) {
          this.a[i][j] = new Dead(i, j);
        } else if ((g.a[i][j].Species == "HUMAN" && (zombieCount > 0)) || (g.a[i][j].Species == "ZOMBIE" && (zombieCount > 0)) || (g.a[i][j].Species == "ZOMBIE" && (humanCount < 1)) || (g.a[i][j].Species == "DEAD" && (zombieCount > 4))) {
          this.a[i][j] = new Zombie(i, j);
        } else {
          this.a[i][j] = new Dead(i, j);
        }
      }
    }
  }
}