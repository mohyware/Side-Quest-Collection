#include <bits/stdc++.h> 
using namespace std;

int main() {
  int n;
  cin >> n;

  if (n <= 0) {
    return 1;
  }

  int sum = n * (n + 1) / 2;

  cout << "The sum of all positive integers less than or equal to " << n << " is " << sum << endl;

  return 0;
}