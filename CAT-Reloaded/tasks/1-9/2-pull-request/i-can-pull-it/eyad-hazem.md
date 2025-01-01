```c++
#include  <bits/stdc++.h>
using namespace std;

void GO(void)  {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	#ifndef ONLINE_JUDGE
		freopen("input.txt",  "r", stdin);
		freopen("output.txt",  "w", stdout);
	#endif
}

int main() {
	GO();
	long long n; cin >> n;
	cout << n * (n + 1) / 2;
}
```
